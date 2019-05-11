const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, )
  .then(hash => {
    const user = new User ({
      nome: req.body.nome,
      email: req.body.email,
      NIF: req.body.NIF,
      morada: req.body.morada,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'Utilizador criado!',
        result: result
      });
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'Utilizador não existe'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: 'Password errada'
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        'secret_this_should_be_longer',
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
})

module.exports = router;
