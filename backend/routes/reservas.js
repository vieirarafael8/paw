const express = require('express');

const Reserva = require('../models/reserva');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.post('',
checkAuth,
(req, res, next) =>{
  const reserva = new Reserva({
    tipoEspaco: req.body.tipoEspaco,
    numComp: req.body.numComp,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    tele: req.body.tele,
    correio: req.body.correio,
    internet: req.body.internet,
    estado: req.body.estado,
    creator: req.userData.userId
  });
  reserva.save().then(createdReserva => {
    res.status(201).json({
      message: 'Reserva Adicionada com Sucesso',
      reservaId: createdReserva._id
      });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Criar Uma Reserva'
    })
  });
});

router.get('',
(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const reservaQuery = Reserva.find();
  let reservasAdq;
  if(pageSize && currentPage){
    reservaQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
    reservaQuery
    .then(documents => {
      reservasAdq = documents;
      return Reserva.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Reservas Obtidas com Sucesso',
        reservas: reservasAdq,
        maxReservas: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Reservas'
    });
  });
});

router.get('/:id',
(req, res, next) => {
    Reserva.findById(req.params.id).then(reserva => {
      if(reserva) {
        res.status(200).json(reserva);
      } else {
        res.status(404).json({message: 'Reserva Não Existe'});
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Erro ao Tentar Obter Reserva'
      });
    });
});

router.delete('/:id',
checkAuth,
(req, res, next) => {
  Reserva.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Reserva Eliminada com Sucesso'});
    } else {
      res.status(401).json({
        message: 'Utilizador Não Autorizado a Eliminar a Reserva'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Eliminar Reserva'
    });
  });
});

module.exports = router;
