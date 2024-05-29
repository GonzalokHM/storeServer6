const { isAuth } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const restrictRoleChange = require('../../middlewares/strictRole');
const { register, login, updateUser, deleteUser, getUsers } = require('../controller/user');
  
  const userRoutes = require('express').Router();
  
  userRoutes.get('/', getUsers);
  userRoutes.post('/register',restrictRoleChange, register);
  userRoutes.post('/login', login);
  userRoutes.put('/auth/avatar',restrictRoleChange, [isAuth], upload.single('avatar'),updateUser);
  userRoutes.delete('/auth/:id', [isAuth], deleteUser);
  
  
  module.exports = userRoutes;
  