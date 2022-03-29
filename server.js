const http = require('http')

const host = 'localhost'
const port = 8000

const requestListener = function (req, res) {
  //   res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(`Hola Mundo, primeros pasos servidor`)

  // Implementar lógica registro,
  // Implementar lógica login,

  // Implementar lógica selección de salas
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
