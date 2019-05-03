const mongoose = require('mongoose');

const reservaSchema = mongoose.Schema({
  tipoEspaco: ['OpenSpace', 'Sala de Reunião', 'Sala de Formação'],
  numComp: Number,
  dataInicio: {type: Date, required: true},
  dataFim: {type: Date, required: true},
  tele: Boolean,
  correio: Boolean,
  internet: Boolean
});

module.exports = mongoose.model('Reserva', reservaSchema);
