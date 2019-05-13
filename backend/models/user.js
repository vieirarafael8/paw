const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  nome: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  NIF: {type: Number, required: true},
  morada: {type: String, required: true},
  password: {type: String, required: true },
  numCartao: {type: Number, required: true},
  validade: {type: Date, required: true},
  ccv: {type: Number, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
