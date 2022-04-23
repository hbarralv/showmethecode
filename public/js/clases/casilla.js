class Casilla{
    constructor(coordenadaX, coordenadaY){
        this._celdaHTML     = document.getElementById("casilla"+coordenadaX+coordenadaY);
        this._coordenadaX   = coordenadaX;
        this._coordenadaY   = coordenadaY;
        this._dueño         = null;      
        this._ocupado       = false;   
    }
    get getCeldaHTML(){
        return this._celdaHTML;
    }
    getCoordenadaX(){
        return this._coordenadaX;
    }
    getCoordenadaY(){
        return this._coordenadaY;
    }
    setDueño(nuevoDueño){
        this._dueño = nuevoDueño;
    }
    getOcupado(){
        return this._ocupado;
    }
    setOcupado(boolano){
        this._ocupado = boolano;
    }
    ocuparCasilla(color, dueño){
        this.getCeldaHTML.style.background = color;
        this.setDueño(dueño);
        this.setOcupado(true);
    }
}
