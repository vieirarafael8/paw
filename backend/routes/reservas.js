const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ReservaController = require('../controllers/reservas');

router.get('/allreservas', ReservaController.getAllReservas);

router.get('/totalgasto', ReservaController.getReservasTotalGasto);

router.post('', checkAuth, ReservaController.criarReserva);

router.get('', checkAuth, ReservaController.getReservas);

router.put('/:id', ReservaController.updateEstado);

router.delete('/:id', checkAuth, ReservaController.deleteReserva);

router.get('/:id', checkAuth, ReservaController.getReserva);




module.exports = router;
