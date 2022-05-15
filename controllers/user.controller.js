//Dependencias
const User = require("../models/user.model");
const Joi = require("@hapi/joi");
const passport = require('passport');

//Reglas de validación
const userValidateSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .required(),
    password: Joi.string()
        .min(4)
        .required(),

});

//Funciones de rutas
const renderLobby = (req, res) => {
    res.render("users/lobby");
};
const renderPlayroom = (req, res) => {
    res.render("users/playroom");
};

//Logueo y deslogueo de usuario
const userLogin = passport.authenticate("local", {
    successRedirect : "/lobby",
    failureRedirect : "/",
    failureFlash    : true,
});

const userLogout = (req, res) => {
    req.logout()
    res.redirect('/');
};

//Creacion de usuario
    //REST POST
    const userPost = (req, res) => {
        const body = req.body
            const { error, value } =  userValidateSchema.validate({ 
                username    : body.username,
                password    : body.password
            });
            if(!error) {   
                crearUsuario(body)
                    .then ( valor => {
                        req.flash('success_msg', 'Se ha creado el usuario'),
                        console.log(`Se ha creado el usuario ${valor.username} `),
                        res.redirect('/')
                    })
                    .catch ( err => {
                        res.status(400),
                        req.flash('error_msg', 'ERROR: Ya existe un usuario con ese nombre.'),
                        res.redirect('/')
                    })
            } else {
                res.status(400),
                req.flash('error_msg', `Error: ${error.details[0].message}`),
                res.redirect('/')
            }
        };
    //CRUD Creacion de usuario
    crearUsuario = async(body) => {
        let user = new User({
            username: body.username,
            password: body.password
        })
        return await user.save()
    }

//Lectura de usuario
    //REST GET 
    const userGetAll = (req, res) => {
        listarUsuarios()
            .then(valor => res.send({ valor }))
    }
    //CRUD Lectura usuario
    listarUsuarios = async() => {
        return User.find()
    }

//Actualización de usuario
    //REST set
    const userUpdate = (req, res) => {
        let id = req.params.id
        let body = req.body

        actualizarUser(id, body)
            .then(valor => res.json({ valor }))
    }
    //CRUD actualizarUser
    actualizarUser = async(id, body) => {
        return await User.findOneAndUpdate({ "_id": id }, {
            $set: {
                username: body.username,
                password: body.password
            }
        }, { new: true })
    }

//Delete usuario
    //REST Delete
    const userDelete = (req, res) => {
        desactivarUsuario(req.params.id)
            .then(valor => res.json({ valor }))
    }
    //CRUD Delete
    desactivarUsuario = async(id) => {
        return usuario = await User.findOneAndUpdate({ "_id": id }, {
            $set: { estado: false }
        }, { new: true })
    }

//Exportaciones
module.exports = {
    renderLobby,
    renderPlayroom,
    userLogin,
    userLogout,
    userPost,
    userGetAll,
    userUpdate,
    userDelete
};