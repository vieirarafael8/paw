const express = require('express');
const bodyParser = require("body-parser");

const app = express();

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
  const reserva = req.body;
  console.log(reserva);
  res.status(201).json({
  message: 'Reserva adicionada com sucesso!'
  });
});

app.get( '/api/reservas', (req, res, next) => {
  const reservas = [
    { tipoEspaco: 'OpenSpace', numComp: '2', tele: true, correio: true,
  internet: true},
];

  res.status(200).json({
    message: 'Reserva adquirida com sucesso!',
    reservas: reservas
  });
});



module.exports = app;
