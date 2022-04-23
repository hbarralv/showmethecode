class Partida{
    constructor(){                
        this._tableroDeJuego = this.nuevoTableroDeJuego();
        this._jugadores      = null;       
        this._cronometro     = null;               
        this._tableroScore   = null     
        this._chat           = null;
        this._ronda          = 0;
        this._ganador        = false;                                         
    }
    getTableroDeJuego(){
        return this._tableroDeJuego;
    }
    setJugadores(jugadores){
        this._jugadores = jugadores;
    }
    autoAsignarID(){}
    nuevoTableroDeJuego(){
        let nuevoTableroDeJuego = new TableroJuego(20, 20); 
        nuevoTableroDeJuego.crea_tableroDeJuego();
        tableroDeJuego = nuevoTableroDeJuego.getTableroDeJuego;
        return tableroDeJuego;
    }
    asignarJugadoresCasillaInicio(jugadores){
        let i = 0;
        while(i < jugadores.length){
            jugadores[i].asignarCasillaInicio(this._tableroDeJuego);
            i++;
        }
        this.setJugadores(jugadores);
    }
    nuevaRonda(){
        let jugadorActual;
        let cronometro = new Cronometro();
        if (!this._ganador){
            jugadorActual = this._jugadores[0];
            console.log(jugadorActual);
            jugadorActual.capturaCasilla();
        }
    }
    mostrarGanador(){}
    mostrarJugadores(){}
    almacenarScore(){}
}