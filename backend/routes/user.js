const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.post('/admin', (req, res, next) => {
  const admin = req.body;
  console.log(admin);
  res.sendFile(__dirname + '../../../app/admin/admin.component.html');
});

router.get('/admin', function(req,res){
  res.sendFile(__dirname + '../../../app/admin/admin.component.html');
 });






module.exports = router;
