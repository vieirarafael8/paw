const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const EspacoController = require('../controllers/espaco');

router.get('/secret', EspacoController.numSecretaria);

router.get('/reuniao', EspacoController.numSalaReuniao);

router.get('/formacao', EspacoController.numSalaFormacao);

router.get('/clientes', EspacoController.getClientes);

router.post('', EspacoController.criarEspaco);

router.get('', EspacoController.criarEspaco);

router.get('/admin', EspacoController.getEspaco);




module.exports = router;
