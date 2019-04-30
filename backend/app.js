const express = require('express');

const app = express();

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

app.use( '/api/reservas', (req, res, next) => {
  const reservas = [
    { id: '1', openspace: 1, salareuniao: 1,
  salaformacao: 1, tele: true, correio: true,
  internet: true},

  { id: '2', openspace: 2, salareuniao: 2,
  salaformacao: 2, tele: true, correio: true,
  internet: true}
];
  res.status(200).json({
    message: 'Reservas adquirida com sucesso!',
    reservas: reservas
  });
});



module.exports = app;
