//Dependencias
const {Router} = require ('express');
const user = require('../controllers/user.controller');
const router = Router();

//Rutas
router.post("/user/login", user.userLogin);
router.get("/lobby",  user.renderLobby);
router.get("/playroom", user.renderPlayroom);
router.post('/user/register', user.userPost);

//Exportaciones
module.exports = router;


