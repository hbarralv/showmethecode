//Función
const User = function(usuario,pass){
    this.username=usuario;
    this.password=pass;
    this.estado=true;
    this.score=0;
};

//Exportaciones
module.exports = {
 User
}