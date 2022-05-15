//Dependencias
const { Router } = require('express');
const index = require('../controllers/index.controller');
const router = Router();

//Rutas
router.get("/", index.renderIndex);
router.get("/register", index.renderRegister);

//Exportaciones
module.exports = router;