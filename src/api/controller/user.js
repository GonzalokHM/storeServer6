const { setError } = require('../../config/error');
const { generateSign } = require('../../config/jwt');
const { deleteFile } = require('../../util/deleteFile');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ userName: req.body.userName });

    if (userDuplicate) {
      return next(setError(400, 'this user alredy exists 😱'));
    }
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return next(setError(400, "can't register 😞"));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(setError(400, "this doesn't exist 😞"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return next(setError(400, "passwords don't macth 😞"));
    }
  } catch (error) {
    return next(setError(400, "can't login 😞"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldUser = await User.findById(id);
    const newUser = new User(req.body);

    if (req.file) {
      newUser.avatar = req.file.path;
      if (oldUser.avatar){
        deleteFile(oldUser.avatar)
      }
    }

    newUser._id = id;

    // Agregar nuevas categorías si se proporcionan, asegurando que sean únicas
    if (req.userName) {
      newUser.userName = req.body.userName
    }

    const UserUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return res.status(200).json(UserUpdated);
  } catch (error) {
    return next(setError(400, "can't update Users 😱"));
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    return next(setError(400, "can't delete Users 😱"));
  }
};

module.exports = { register, login , updateUser, deleteUser};
