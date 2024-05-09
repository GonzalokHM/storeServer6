const categoriesRoutes = require('./category');
const productsRoutes = require('./product');
const userRoutes = require('./user');

const indexRouter = require('express').Router();

indexRouter.use('/products', productsRoutes);
indexRouter.use('/categories', categoriesRoutes);
indexRouter.use('/users', userRoutes)

module.exports = indexRouter;
