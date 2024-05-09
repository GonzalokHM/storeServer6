const {isAuth} = require('../../middlewares/auth');
const {
  getAllCategories,
  getCategoryByid,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/category');

const categoriesRoutes = require('express').Router();

categoriesRoutes.get('/', getAllCategories);
categoriesRoutes.get('/:id', getCategoryByid);
categoriesRoutes.post('/', [isAuth], createCategory);
categoriesRoutes.put('/:id', [isAuth], updateCategory);
categoriesRoutes.delete('/:id', [isAuth], deleteCategory);

module.exports = categoriesRoutes;
