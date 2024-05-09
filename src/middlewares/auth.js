const User = require('../api/model/user');
const { setError } = require('../config/error');
const { verifyJwt } = require('../config/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
        console.log('notoken');
      return next(setError(400, 'te has columpiado, acceso privado'));
    }

    const parsedToken = token.replace('Bearer', '').trim();
    const validToken = verifyJwt(parsedToken);
    const userLogued = await User.findById(validToken.id);
    userLogued.password = null;
    req.user = userLogued;
    
    next();
  } catch (error) {
    return next(setError(400, 'llave incorrecta'));
  }
};

module.exports = { isAuth };
