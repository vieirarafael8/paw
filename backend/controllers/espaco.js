const Espaco = require('../models/espaco');
const Reserva = require('../models/reserva');

exports.espaco = (req, res, next) => {
  const espaco = req.body;
  console.log(espaco);
};

exports.criarEspaco = (req,res,next) => {
  res.sendFile(__dirname + 'C:\Users\vieir\OneDrive\Documentos\Trabalho PAW\paw\src\app\espaco\criar-espaco\criar-espaco.component.html');
 };

 exports.getEspaco = (req, res, next) => {
  const espacoQuery = Espaco.find();
  let espacosAdq;
    espacoQuery
    .then(documents => {
      espacosAdq = documents;
      return Espaco.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Espaco Obtido com Sucesso',
        espacos: espacosAdq,
        maxEspacos: count
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Espaco'
    });
  });
};

exports.getClientes= (req, res, next) => {
  const clientesQuery = Reserva.distinct("creator", { tipoEspaco: "Openspace" });

  clientesQuery
  .then(documents => {
    clientesAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Utilizadores que reservaram secretarias Openspace Obtido com Sucesso',
      clientes: clientesAdq,
      maxClientes: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Utilizadores que reservaram secretarias Openspace'
    });
  });
};

exports.getClientesReuniao= (req, res, next) => {
  const clientesRQuery = Reserva.distinct("creator", { tipoEspaco: "Sala de Reunião" });

  clientesRQuery
  .then(documents => {
    clientesRAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Utilizadores que reservaram Salas de Reunião Obtido com Sucesso',
      clientesR: clientesRAdq,
      maxClientesR: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Utilizadores que reservaram Salas de Reunião'
    });
  });
};

exports.getClientesFormacao= (req, res, next) => {
  const clientesFQuery = Reserva.distinct("creator", { tipoEspaco: "Sala de Formação" });

  clientesFQuery
  .then(documents => {
    clientesFAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Utilizadores que reservaram Salas de Formação Obtido com Sucesso',
      clientesF: clientesFAdq,
      maxClientesF: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Utilizadores que reservaram Salas de Formação'
    });
  });
};


exports.numSecretaria = (req, res) => {
  const secretQuery = Reserva.find({ tipoEspaco: "Openspace" });

  secretQuery
  .then(documents => {
    secretAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Reserva Tipo Espaço OpenSpace Obtido com Sucesso',
      secrets: secretAdq,
      maxSecret: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Reserva Tipo Espaço OpenSpace'
    });
  });
}

exports.numSalaReuniao = (req, res) => {
  const salaRQuery = Reserva.find({ tipoEspaco: "Sala de Reunião" });

  salaRQuery
  .then(documents => {
    salaRAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Reserva Tipo Sala de Reunião Obtido com Sucesso',
      salasR: salaRAdq,
      maxSalasR: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Reserva Tipo Sala de Reunião'
    });
  });
}

exports.numSalaFormacao = (req, res) => {
  const salasFQuery = Reserva.find({ tipoEspaco: "Sala de Formação" });

  salasFQuery
  .then(documents => {
    salasFAdq = documents;
    return Reserva.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Reserva Tipo Sala de Formação Obtido com Sucesso',
      salasF: salasFAdq,
      maxSalasF: count
  });
  }).catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Reserva Tipo Sala de Formação'
    });
  });
}

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


