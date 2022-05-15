//Dependencias
const { Router } = require('express');
const user = require('../controllers/user.controller');
const router = Router();

//Rutas
router.post("/user/login", user.userLogin);
router.get("/lobby", user.renderLobby);
router.get("/playroom", user.renderPlayroom);

//CRUD
router.post("/user/register", user.userPost);
router.get("/user/all", user.userGetAll);
router.put("/user/:id", user.userUpdate);
router.delete("/user/:id", user.userDelete);

//Exportaciones
module.exports = router;