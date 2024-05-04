const productsRoutes = require('./product');

const indexRouter = require('express').Router();

indexRouter.use('/products', productsRoutes);

module.exports = indexRouter;
