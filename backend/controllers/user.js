const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

exports.createUser = (req, res, next) => {

  var jsonDate = req.body.validade;
  var then = new Date(jsonDate);

  console.log('data ' + then);

  d = dateFormat(then, "mm/yyyy");
  console.log('data ' + d);


  bcrypt.hash(req.body.password, 10 )

  .then(hash => {

    const user = new User ({
      nome: req.body.nome,
      email: req.body.email,
      NIF: req.body.NIF,
      morada: req.body.morada,
      password: hash,
      numCartao: req.body.numCartao,
      validade: d,
      ccv: req.body.ccv,
      totalGasto: req.body.totalGasto
    });
    console.log(user);
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'Utilizador Criado!',
        result: result
      });
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        message: 'Erro ao registar utilizador'
      });
    });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'Utilizador Não Existe'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Password Errada'
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Erro no Login'
      });
    })
};

exports.users = (req, res, next) => {
  const uers = req.body;
  console.log(users);
};

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = req.query.page;
  const userQuery = User.find({id: req.body.id});
  let usersAdq;
  if(pageSize && currentPage){
    userQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
    userQuery
    .then(documents => {
      usersAdq = documents;
      return User.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Users Obtidos com Sucesso',
        users: usersAdq,
        maxUsers: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Obter Users'
    });
  });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.body.id);

  User.deleteOne({id: req.body.id}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Utilizador Eliminada com Sucesso'});
    } else {
      res.status(401).json({
        message: 'Utilizador Não Autorizado a Eliminar a User'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro ao Tentar Eliminar o Utilizador'
    });
  });
};
