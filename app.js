//Dependencias
const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars').engine;
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const flash = require('connect-flash');
const index = require('./routes/index.routes');
const users = require('./routes/user.routes');
const port = 3000;

//Inicio
const app = express();


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
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "ShowMeTheCode",
        resave: true,
        saveUninitialized: true,
    })
);


app.use(flash());

//Variables
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

//Rutas
app.use(index);
app.use(users);
app.use(express.static(path.join(__dirname, '/public')));
app.use("/public/css", express.static(__dirname + "/public/css"));
app.use("/public/js", express.static(__dirname + "/public/js"));
app.use("/public/img", express.static(__dirname + "/public/img"));

// Socket.io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", function(socket) {
    console.log("Un usuario se ha conectado (socket.io)");
});

//Conexión
server.listen(port, () => {
    console.info("Servidor", port, "en funcionamiento");
});