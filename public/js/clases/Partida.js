class Partida{
    constructor(){                
        this._tableroDeJuego = this.nuevoTableroDeJuego();
        this._jugadores      = null;                                              
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
 
    mostrarJugadores(){}

}
