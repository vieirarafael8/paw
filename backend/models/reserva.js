const mongoose = require('mongoose');

const reservaSchema = mongoose.Schema({
  tipoEspaco: {type: ['OpenSpace', 'Sala de Reunião', 'Sala de Formação'], required: true, default: 'OpenSpace'},
  numComp: Number,
  dataInicio: {type: Date, required: true},
  dataFim: {type: Date, required: true},
  tele: Boolean,
  correio: Boolean,
  internet: Boolean,
  estado: {type: ['concluída', 'pendente'], default: 'pendente'},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  custo: Number
});

module.exports = mongoose.model('Reserva', reservaSchema);
