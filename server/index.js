

function juego (require,response){

    require = ['Jacobo', 'Damian']
    var users = []
    users.push(require)
    let usuarios = users.toString()

    require = 'Damian'
    var sala1 = []
    sala1.push(require)
    let sala01 = sala1.toString()

    require = 'Jacobo'
    var sala2 = []
    sala2.push(require)
    let sala02 = sala2.toString()

    require = ''
    var sala3 = []
    sala3.push(require)
    let sala03 = sala3.toString()

    require = ''
    var sala4 = []
    sala4.push(require)
    let sala04 = sala4.toString()

    var jugadores = 'Los jugadores logueados son: ' + usuarios + '.\n' 
    + 'En la sala 1 se encuentran los siguientes usuarios:' + sala01 + '.\n'
    + 'En la sala 2 se encuentran los siguientes usuarios:' + sala02 + '.\n'
    + 'En la sala 3 se encuentran los siguientes usuarios:' + sala03 + '.\n'
    + 'En la sala 4 se encuentran los siguientes usuarios:' + sala04 + '.\n'

    response.end(jugadores) 

}


var http= require('http')

http.createServer(juego).listen(8000, 'localhost')
console.log ('Server running at http://127.0.0.1:1337/')