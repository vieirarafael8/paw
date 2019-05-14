const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const EspacoController = require('../controllers/espaco');

router.post('/criar-espaco', checkAuth, EspacoController.criarEspaco);

router.delete('/:id', checkAuth, EspacoController.deleteEspaco);

module.exports = router;
