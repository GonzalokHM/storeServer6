const { isAuth } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { register, login, updateUser, deleteUser } = require('../controller/user');
  
  const userRoutes = require('express').Router();
  
  userRoutes.post('/register', register);
  userRoutes.post('/login', login);
  userRoutes.put('/auth/avatar', [isAuth], upload.single('avatar'),updateUser);
  userRoutes.delete('/auth/deleteUser', [isAuth], deleteUser);
  
  module.exports = userRoutes;
  