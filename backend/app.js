const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const Reserva = require('./models/reserva');


const app = express();

mongoose.connect('mongodb+srv://admin:2FNJ8e4QBEHHUjga@cluster0-8ok3m.mongodb.net/managemyspace?retryWrites=true')
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connected failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/reservas', (req, res, next) =>{
  const reserva = new Reserva({
    tipoEspaco: req.body.tipoEspaco,
    numComp: req.body.numComp,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    tele: req.body.tele,
    correio: req.body.correio,
    internet: req.body.internet
  });
  reserva.save().then(createdReserva => {
    res.status(201).json({
      message: 'Reserva adicionada com sucesso!',
      reservaId: createdReserva._id
      });
  });
});

app.get( '/api/reservas', (req, res, next) => {

  Reserva.find().then(documents => {
    res.status(200).json({
      message: 'Reserva adquirida com sucesso!',
      reservas: documents
    });
  });
});

app.delete('/api/reservas/:id', (req, res, next) => {

  Reserva.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Reserva eliminada com sucesso!'});
  });
});

module.exports = app;
