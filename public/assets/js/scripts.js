// Buscar todos los elementos que tengan el atributo [sala-select]
const salas = document.querySelectorAll('[sala-select]')

// Busca el elemento del cuerpo del contenedor donde se colocará el h2
const body = document.querySelector('#container-body')

//Busca todos los elementos que contengan el atributo [avatar]
const avatares = document.querySelectorAll('[avatar]')

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

// Arrastrar y soltar elementos

let dragged;

function allowDrop(event){
  event.preventDefault();
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragLeave(event) {
  event.sala.style.background = '';
}

function onDragEnter(event) {
  const sala = event.sala;
  if (sala && dragged) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move'
      sala.style.background = '#1f904e';
  }
}

function onDrop(event) {
  const sala = event.sala;
  if (sala && dragged) {
    sala.style.backgroundColor = '';
    event.preventDefault();
    dragged.salas.removeChild(dragged);
    dragged.style.opacity = '';
    sala.appendChild(dragged);
  }
}

function onDragStart(event) {
  let sala = event.sala;
  if (sala && sala.salas === 'drop-zone') {
      dragged = sala;
      event.dataTransfer.setData('text', sala.id);
      event.dataTransfer.dropEffect = 'move';
      event.sala.style.opacity = .3;
  }
}

function onDragEnd(event) {
  if (event.sala && event.sala.salas === 'drop-zone') {
      event.sala.style.opacity = '';
      dragged = null; 
  }
}

const avatar = document.querySelector('.avatares');
const sala = document.querySelector('.drop-zone');

Array.from(salas).forEach(avatar => {
  avatar.addEventListener('dragstart', onDragStart);
  avatar.addEventListener('dragend', onDragEnd);
})

Array.from(salas).forEach(sala => {
  sala.addEventListener('drop', onDrop)
  sala.addEventListener('dragenter', onDragEnter)
  sala.addEventListener('dragleave', onDragLeave)
  sala.addEventListener('dragover', onDragOver)
})

