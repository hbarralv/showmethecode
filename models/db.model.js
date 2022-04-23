//Función
const Database = function () {
  this.usuarios = new Array();

  //Lee el archivo, lo pasa a JSON, comprueba y si está el dato se lo añadimos a usuarios.
  this.loadDatabase =  function () {
    var fs=require('fs');
    var loc = __dirname;
    var buff =  fs.readFileSync(loc + '/database.json');
    var datas=JSON.parse(buff.toString());
    if('usuarios' in datas){
        this.usuarios=datas['usuarios'];
    }
  };
  this.saveDatabase = function(){
      var loc = __dirname;
      var datas={'usuarios':this.usuarios};
      var datasString=JSON.stringify(datas);
      var fs=require('fs');
       fs.writeFileSync(loc + '/database.json',datasString,function(err){
      })
  }
  this.addusuario =  function (usuario) {
    this.loadDatabase();
    this.usuarios.push(usuario);
    this.saveDatabase();
  };
  this.checkusuario =  function (name, pass) {
    var datas =  this.loadDatabase();
    var localizado = false;
    var logueado = false;
    var i = 0;
    while (localizado == false && i < this.usuarios.length) {
      var usuario = this.usuarios[i];
      if (usuario.username == name) {
        localizado = true;
        if (usuario.password == pass) {
          logueado = true;
        }
      }
      i++;
    }
    if (localizado && logueado) {
      return "correcto";
    } else if (localizado && !logueado) {
      return "existe";
    } else if (!localizado && !logueado) {
      return "crear";
    } else {
      return "error";
    }
  };
};

//Exportaciones
module.exports = {
  Database,
};
