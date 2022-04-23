class TableroJuego{
    constructor(fila, columna){
        this._fila = fila;
        this._columna = columna;
        this._tableroDeJuego;
    };
    get getFila(){
        return this._fila;
    }
    set setFila(valor){
        this._fila=valor;
    }
    get getColumna(){
        return this._columna;
    }
    set setColumna(valor){
        this._columna=valor;
    }
    get getTableroDeJuego(){
        return this._tableroDeJuego;
    }
    imprimeResultado(){  
        console.log(`Has creado un nuevo tablero de ${this._fila} filas + ${this._columna} columnas`);
    }
    crea_tableroDeJuego(){
        this.defineDimension_tableroDeJuego(this._tableroDeJuego);
        this.instanciarCasillas_tableroDeJuego(this._tableroDeJuego);
        this.imprimeResultado();
    }
    defineDimension_tableroDeJuego(tableroDeJuego){
        tableroDeJuego = new Array(this._fila);
        for (var i = 0; i < this._fila; i++){
            tableroDeJuego[i] = new Array(this._columna);
        }
        this._tableroDeJuego = tableroDeJuego;
    }
    instanciarCasillas_tableroDeJuego(tableroDeJuego){       
        for (var i = 0; i < this._fila; i++){
            for (var j = 0; j < this._columna; j++){
                let casillaVacia = new Casilla(i, j);
                tableroDeJuego[i][j] = casillaVacia;
            }
        }
    }
}