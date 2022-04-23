//Dependencias
const renderIndex = (req, res) => {
    res.render("index");
};

//Funciones
const renderContact = (req, res) => {
    res.render("contact");
};
const renderRegister = (req, res) => {
    res.render("register");
};

//Exportaciones
module.exports = {
    renderIndex,
    renderContact,
    renderRegister,
}