const restrictRoleChange = (req, res, next) => {
    if (req.body.rol) {
      delete req.body.rol;
    }
    next();
  };
  
  module.exports = restrictRoleChange;