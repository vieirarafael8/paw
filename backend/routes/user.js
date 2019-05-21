const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.get('/listar', UserController.getUsers);

router.delete('/listar/:id', UserController.deleteUser);


module.exports = router;
