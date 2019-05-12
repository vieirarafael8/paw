const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ReservaController = require('../controllers/reservas');

router.post('', checkAuth, ReservaController.criarReserva);

router.get('', ReservaController.getReservas);

router.get('/:id', ReservaController.getReserva);

router.delete('/:id', checkAuth, ReservaController.deleteReserva);

module.exports = router;
