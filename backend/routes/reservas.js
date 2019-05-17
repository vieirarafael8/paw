const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ReservaController = require('../controllers/reservas');

router.post('', checkAuth, ReservaController.criarReserva);

router.get('', checkAuth, ReservaController.getReservas);

router.get('/:id', ReservaController.getReserva);

router.delete('/:id', checkAuth, ReservaController.deleteReserva);

router.get('/allreservas', ReservaController.getAllReservas);


module.exports = router;
