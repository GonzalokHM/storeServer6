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
categoriesRoutes.post('/', [isAuth], upload.single('image'), createCategory);
categoriesRoutes.put('/:id', [isAuth], upload.single('image'), updateCategory);
categoriesRoutes.delete('/:id', [isAuth], deleteCategory);

module.exports = categoriesRoutes;
