const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');

exports.admin = (req, res, next) => {
  const admin = req.body;
  console.log(admin);
};

exports.getAdmin = (req,res,next) => {
  res.sendFile(__dirname + 'C:\Users\vieir\OneDrive\Documentos\Trabalho PAW\paw\src\app\admin\admin.component.html');
 };


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
      ccv: req.body.ccv
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
