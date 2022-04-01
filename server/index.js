const http = require('http')
const qs = require('querystring')

const host = 'localhost'
const port = 8100

const registros = [
  {
    usuario: 'damian',
    password: '123'
  }
]

const salas = {
  1: [],
  2: [],
  3: [],
  4: []
}

const juego = function (peticion, respuesta) {
  // Verificamos que la petición sea de tipo post

  if (peticion.method == 'GET' && peticion.url === '/registros') {
    respuesta.end(registros.length.toString())
    return
  }

  if (peticion.method == 'GET' && peticion.url === '/') {
    // Se parsean todas las salas en un string para ver que usuarios hay en ellas
    let mensaje = ''
    mensaje +=
      'Sala 1: ' +
      (salas['1'][0] || 'Puesto vacio') +
      ' y ' +
      (salas['1'][1] || 'Puesto vacio') +
      '\n'
    mensaje +=
      'Sala 2: ' +
      (salas['2'][0] || 'Puesto vacio') +
      ' y ' +
      (salas['2'][1] || 'Puesto vacio') +
      '\n'
    mensaje +=
      'Sala 3: ' +
      (salas['3'][0] || 'Puesto vacio') +
      ' y ' +
      (salas['3'][1] || 'Puesto vacio') +
      '\n'
    mensaje +=
      'Sala 4: ' +
      (salas['4'][0] || 'Puesto vacio') +
      ' y ' +
      (salas['4'][1] || 'Puesto vacio') +
      '\n'

    respuesta.end(mensaje)
  }

  if (peticion.method == 'POST') {
    console.log('AQUI', peticion.url)
    let body = ''
    peticion.on('data', function (data) {
      // Leer el stream de datos para guardar en la variable body
      body += data
    })
    peticion.on('end', function () {
      // Variable con el objeto de la petición
      const post = qs.parse(body)

      if (peticion.url === '/salas') {
        if (salas[post.sala].length === 2) {
          respuesta.end('Sala llena, intente con otra')
          return
        }
        salas[post.sala].push(post.usuario)
        respuesta.end(
          'Se ha agregó en la sala ' + post.sala + ' al usuario ' + post.usuario
        )
        return
      }

      if (peticion.url === '/registro') {
        registros.push(post)
        respuesta.end('Usuario registrado')
      }

      if (peticion.url === '/ingresar') {
        console.log(post)
        const usuario = registros.find(function (registro) {
          return (
            registro.usuario === post.usuario &&
            registro.password === post.password
          )
        })
        console.log(registros)
        if (usuario) {
          respuesta.end('Usuario encontrado')
        } else {
          respuesta.end('Usuario no encontrado')
        }
      }
    })
  }
}

const server = http.createServer(juego)
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
