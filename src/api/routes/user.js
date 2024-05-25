const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { register, login, updateUser, deleteUser, updateUserRole, getUsers } = require('../controller/user');
  
  const userRoutes = require('express').Router();
  
  userRoutes.get('/', getUsers);
  userRoutes.post('/register', register);
  userRoutes.post('/login', login);
  userRoutes.put('/auth/avatar', [isAuth], upload.single('avatar'),updateUser);
  userRoutes.put('/auth/:id', [isAuth , isAdmin], updateUserRole);
  userRoutes.delete('/auth/:id', [isAuth], deleteUser);
  
  
  module.exports = userRoutes;
  