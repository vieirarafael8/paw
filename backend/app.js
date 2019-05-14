const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const reservaRoutes = require('./routes/reservas');
const userRoutes = require('./routes/user');
const espacoRoutes = require('./routes/espaco');

const app = express();

mongoose.connect('mongodb+srv://admin:'+ process.env.MONGO_ATLAS_PW + '@cluster0-8ok3m.mongodb.net/managemyspace', { useNewUrlParser: true })
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/reservas', reservaRoutes);
app.use('/api/user', userRoutes);
app.use('/api/espacos', espacoRoutes);

module.exports = app;
