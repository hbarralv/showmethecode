class Jugador {
    constructor(idJugador, nickName) {
        this._idJugador = idJugador;
        this._nickName = nickName;
        this._avatar = null;
        this._color = null;
        this._casillas = new Array();
    }
    getNickName() {
        return this._nickName;
    }
    getColor() {
        return this._color;
    }
    setColor(valor) {
        this._color = valor;
    }
    getCasillas() {
        return this._casillas;
    }
    asignarCasillaInicio(tableroDeJuego) {
        let x = Math.round(Math.random() * 9);
        let y = Math.round(Math.random() * 9);
        let casillaInicio = tableroDeJuego[x][y];
        let colorJugador = this.getColor();
        let nickNameJugador = this.getNickName();
        if (!casillaInicio.getOcupado()) {
            casillaInicio.ocuparCasilla(colorJugador, nickNameJugador);
            this._casillas.push(casillaInicio);
            console.log(casillaInicio);
        } else {
            this.asignarCasillaInicio(tableroDeJuego);
        }
    }
    capturaCasilla(x, y) {
        let casilla = tableroDeJuego[x][y];
        let colorJugador = this.getColor();
        let nickNameJugador = this.getNickName();
        if (!casilla.getOcupado()) {
            casilla.ocuparCasilla(colorJugador, nickNameJugador);
            this._casillas.push(casilla);
            console.log(`El jugador ${this._nickName} ha capturado la casilla: (${x},${y})`)
        } else {
            alert("No se puede capturar está casilla");
        }
    }
    partidasGanas() {}
    PartidasJugadas() {}
}