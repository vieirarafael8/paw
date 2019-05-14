const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const EspacoController = require('../controllers/espaco');

router.post('/criar-espaco', EspacoController.espaco);

router.get('/criar-espaco', EspacoController.getEspaco);

router.post('/lista-reservas', EspacoController.listaReservas);

router.get('/lista-reservas', EspacoController.getListaReservas);



module.exports = router;
