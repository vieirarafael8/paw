const Espaco = require('../models/espaco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

exports.espaco = (req, res, next) => {
  const espaco = req.body;
  console.log(espaco);
};

exports.criarEspaco = (req,res,next) => {
  res.sendFile(__dirname + 'C:\Users\vieir\OneDrive\Documentos\Trabalho PAW\paw\src\app\espaco\criar-espaco\criar-espaco.component.html');
 };

 exports.getEspaco = (req, res, next) => {
  const espacoQuery = Espaco.find({_id: req.params.id});
  let espacosAdq;
    espacoQuery
    .then(documents => {
      espacosAdq = documents;
      return espaco.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Espaços Obtidos com Sucesso',
        espacos: espacosAdq,
        maxespacos: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Espaços'
    });
  });
};


exports.criarEspaco = (req, res, next) => {
  const espaco = new Espaco({
    numSecretOpenSpace: req.body.numSecretOpenSpace,
    numSalaReuniao: req.body.numSalaReuniao,
    numSalaFormacao: req.body.numSalaFormacao,
    estadoEspaco: req.body.estadoEspaco,
    taxaSecretaria: req.body.taxaSecretaria,
    taxaTele: req.body.taxaTele,
    taxaCorreio: req.body.taxaCorreio,
    taxaInternet: req.body.taxaInternet,
    taxaReuniao: req.body.taxaReuniao,
    taxaFormacao: req.body.taxaFormacao
  });
  espaco.save().then(createdEspaco => {
    res.status(201).json({
      message: 'Espaço Adicionado com Sucesso',
      espacoId: createdEspaco._id
      });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Criar Espaço'
    })
  });
};

exports.deleteEspaco = (req, res, next) => {
  Espaco.deleteOne({_id: req.params.id}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Espaco Eliminado com Sucesso'});
    } else {
      res.status(401).json({
        message: 'Utilizador Não Autorizado a Eliminar o Espaco'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Eliminar Espaco'
    });
  });
};


