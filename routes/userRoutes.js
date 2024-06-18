const express = require('express')
const router = express.Router()
const {getAllUsers, getUser, addUser, updateUser, deleteUser, signupUser, loginUser}  = require('../controllers/userController');


router.get('/',getAllUsers);

  router.get('/user/:id', getUser);

  router.post('/user',addUser);

  router.patch('/user/:id',updateUser);

  router.delete('/user/:id',deleteUser);


  router.post('/signup',signupUser);
  router.post('/login',loginUser);
  
module.exports = router