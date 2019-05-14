const Espaco = require('../models/espaco');

exports.criarEspaco = (req, res, next) =>{
  const espaco = new Espaco({
    tipoEspaco: req.body.tipoEspaco,
    numComp: req.body.numComp,
    numOpenspace: req.body.numOpenspace,
    numSalaReuniao: req.body.numSalaReuniao,
    numSalaFormacao: req.body.numSalaFormacao,
    estadoEspaco: req.body.estadoEspaco,
    creator: req.userData.userId,
    taxaSecretaria: req.body.taxaSecretaria,
    taxaTele: req.body.taxaTele,
    taxaCorreio: req.body.taxaCorreio,
    taxaInternet: req.body.taxaInternet,
    taxaReuniao: req.body.taxaReuniao,
    taxaFormacao: req.body.taxaFormacao,
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
  Espaco.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
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
