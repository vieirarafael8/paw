const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const EspacoController = require('../controllers/espaco');

router.post('', EspacoController.criarEspaco);

router.get('', EspacoController.criarEspaco);

//router.get('/info-espaco', EspacoController.getEspacos);

//router.post('/lista-reservas', EspacoController.listaReservas);

router.get('/lista-reservas', EspacoController.getListaReservas);



module.exports = router;
