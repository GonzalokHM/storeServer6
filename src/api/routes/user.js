const { register, login, updateUser, deleteUser } = require('../controller/user');
  
  const userRoutes = require('express').Router();
  
  userRoutes.post('/register', register);
  userRoutes.post('/login', login);
  userRoutes.put('/auth/avatar', [isAuth], upload.single('image'),updateUser);
  userRoutes.delete('/auth/deleteUser', [isAuth], deleteUser);
  
  module.exports = userRoutes;
  