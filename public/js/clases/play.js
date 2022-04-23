window.addEventListener("load", play, false);

let partida;
let tableroDeJuego;
let jugadores = new Array();
function play() {
    partida = new Partida();
    let jugador1 = new Jugador('01', 'Dracula');
    jugador1.setColor("red");
    jugadores.push(jugador1)
    let jugador2 = new Jugador('02', 'Lobo');
    jugador2.setColor("purple");
    jugadores.push(jugador2)
    let jugador3 = new Jugador('03', 'Momia');
    jugador3.setColor("beige");
    jugadores.push(jugador3)
    let jugador4 = new Jugador('04', 'Prometeo');
    jugador4.setColor("aqua");
    jugadores.push(jugador4)
    partida.asignarJugadoresCasillaInicio(jugadores);
}

let iJugador = 0;

function capturarSiSePuede(x_Pulsado, y_Pulsado) {
    let jugadorActual;
    let sePuede = false;
    let j = 0;
    jugadorActual = jugadores[iJugador];
    while (j < jugadorActual.getCasillas().length) {
        let casillaPrueba = jugadorActual.getCasillas()[j];
        let x_Actual = casillaPrueba.getCoordenadaX();
        let y_Actual = casillaPrueba.getCoordenadaY();
        let dif_x = x_Pulsado - x_Actual;
        let dif_y = y_Pulsado - y_Actual;
        if (dif_x == 1 && dif_y == -1) sePuede = true;
        if (dif_x == 0 && dif_y == -1) sePuede = true;
        if (dif_x == -1 && dif_y == -1) sePuede = true;
        if (dif_x == 1 && dif_y == 0) sePuede = true;
        if (dif_x == 0 && dif_y == 0) sePuede = true;
        if (dif_x == -1 && dif_y == 0) sePuede = true;
        if (dif_x == 1 && dif_y == 1) sePuede = true;
        if (dif_x == 0 && dif_y == 1) sePuede = true;
        if (dif_x == -1 && dif_y == 1) sePuede = true;
        j++;
    }
    if (sePuede) {
        jugadorActual.capturaCasilla(x_Pulsado, y_Pulsado);
    }
}