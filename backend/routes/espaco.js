const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const EspacoController = require('../controllers/espaco');

router.post('', EspacoController.criarEspaco);

router.get('', EspacoController.criarEspaco);

router.get('/info', EspacoController.getEspaco);

router.get('/lista', EspacoController.getAdminReservas);

module.exports = router;
