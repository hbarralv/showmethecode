//Dependencias
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars').engine;
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const flash = require('connect-flash');
const passport = require('passport');
const index = require('./routes/index.routes');
const users = require('./routes/user.routes');
const port = 3000;
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentacion/swagger.json');


//Inicio
const app = express();
require('./config/passport');

//Conexion a base de datos
mongoose.connect('mongodb://localhost/showmethecode')
    .then(() => console.log('Se ha conectado correctamente'))
    .catch(err => console.log('Error. No se ha conectado correctamente.'))


//HBS
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: ".hbs",
}));
app.set("view engine", ".hbs");


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Middelwares (se encargan de procesar lo que estamos recibiendo en estas rutas antes de que lleguen)
app.use(morgan('dev'))
//método para que cuando un formulario de html me envíe datos lo haga a través de la url
app.use(express.urlencoded({extended:false}))
//método para recibir jsons en el servidor y entender lo que viene del navegador
app.use(express.json())

//Variables
app.use((req, res, next) => {
    res.locals.success_msg  = req.flash("success_msg");
    res.locals.error_msg    = req.flash("error_msg");
    res.locals.error        = req.flash("error");
    res.locals.user         = req.user || null;
    next();
});


//Rutas
app.use(index);
app.use(users);
app.use(express.static(path.join(__dirname, '/public')));
app.use("/public/css", express.static(__dirname + "/public/css"));
app.use("/public/js", express.static(__dirname + "/public/js"));
app.use("/public/img", express.static(__dirname + "/public/img"));
//Documentación de la API REST usando Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Socket.io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", function(socket) {
    console.log("El usuario está online.");
});

//Conexión
app.listen(port, () => {
    console.info("Servidor", port, "en funcionamiento");
});