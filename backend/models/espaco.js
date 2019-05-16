const mongoose = require('mongoose');

const espacoSchema = mongoose.Schema({
  numSecretOpenSpace: {type: Number, required: true},
  numSalaReuniao: {type: Number, required: true},
  numSalaFormacao: {type: Number, required: true},
  estadoEspaco: {type: ['cheio', 'livre'], default: 'livre'},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  taxaSecretaria: {type: Number, required: true},
  taxaTele: {type: Number, required: true},
  taxaCorreio: {type: Number, required: true},
  taxaInternet: {type: Number, required: true},
  taxaReuniao: {type: Number, required: true},
  taxaFormacao: {type: Number, required: true}
});

module.exports = mongoose.model('Espaco', espacoSchema);
