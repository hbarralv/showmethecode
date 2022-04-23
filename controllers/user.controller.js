//Dependencias
const User = require("../models/user.model");
const Database = require("../models/db.model");
const Joi = require("@hapi/joi");

//Función de validación de usuario
const userValidateSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
});

//Funciones de rutas
const renderLobby = (req, res) => {
  res.render("users/lobby");
};
const renderPlayroom = (req, res) => {
  res.render("users/playroom");
};

//Funciones logueo
const userLogin = (req, res) => {
  const body = req.body;
  const database = new Database.Database();
  const estado = database.checkusuario(body.username, body.password);
  if (estado == "correcto") {
      console.log(`El usuario ${body.username} está online.`),
      res.redirect("/lobby");
  } else if (estado == "existe") {
    res.status(400),
      res.redirect("/");
  } else if (estado == "crear") {
    res.status(400),
      res.redirect("/");
  } else {
    res.status(400), req.alert("ERROR"), res.redirect("/");
  }
};

//Funciones registro
const userPost = (req, res) => {
  const body = req.body;
  const { error, value } = userValidateSchema.validate({
    username: body.username,
    password: body.password,
  });
  if (!error) {
    const database = new Database.Database();
    const estado = database.checkusuario(body.username, body.password);
    if (estado == "correcto") {
      console.log(`El usuario ${body.username} está online.`),
        res.redirect("/lobby");
    } else if (estado == "existe") {
      res.status(400),
        res.redirect("/");
    } else if (estado == "crear") {
      var usuariodata = new User.User(body.username, body.password);
      if (usuariodata) {
        database.addusuario(usuariodata);
      }
        console.log(`El usuario ${body.username} se ha registrado.`),
        res.redirect("/");
    } else {
      res.status(400), req.alert("ERROR"), res.redirect("/");
    }
  } else {
    res.status(400),
      res.redirect("/");
  }
};

//Exportaciones
module.exports = {
  renderLobby,
  renderPlayroom,
  userLogin,
  userPost,
};