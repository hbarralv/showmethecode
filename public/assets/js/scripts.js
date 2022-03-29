// Buscar todos los elementos que tengan el atributo [sala-select]
const salas = document.querySelectorAll('[sala-select]')

// Busca el elemento del cuerpo del contenedor donde se colocará el h2
const body = document.querySelector('#container-body')

// Etiqueta h2 donde se mostrará el mensaje de la sala guardada
const h2 = document.createElement('h2')

// Agrega el H2 para el mensaje al cuerpo del contenedor
body.appendChild(h2)

// Genera un array a partir de un NodeList e itera cada uno de los elementos de la lista
Array.from(salas).forEach(sala => {
  // Se añade un listener de click a cada uno de los elementos
  sala.addEventListener('click', e => {
    // callback que se llama cuando se haga click en el elemento
    // Obtenemos ID del elemento
    const id = e.target.id
    // Guardamos el ID en localStorage con la llave 'sala'
    window.localStorage.setItem('sala', id)
    // Pintamos el mensaje en el H2 de la sala seleccionada
    h2.innerHTML = 'Sala Seleccionada ' + id
  })
})

// Obtenemos la sala guardada, en caso de que haya alguna
const salaGuardada = window.localStorage.getItem('sala')

// Verificamos si hay sala guardada
if (salaGuardada) {
  // En caso de que haya, cambiamos el mensaje del H2
  h2.innerHTML = 'Sala Seleccionada ' + salaGuardada
}
