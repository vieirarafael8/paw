const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.post('/admin', UserController.admin);

//router.post('/listar-users', UserController.users);

router.get('/admin', UserController.getAdmin);

router.get('/listar', UserController.getUsers);

router.delete('/listar/:id', UserController.deleteUser);


module.exports = router;
