const { isAuth } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getAllProducts,
  getProductByid,
  createProduct,
  updateProduct,
  deleteProduct,
  addToFavorite,
} = require('../controller/product');

const productsRoutes = require('express').Router();

productsRoutes.get('/', getAllProducts);
productsRoutes.get('/:id', getProductByid);
productsRoutes.post('/', [isAuth], upload.single('image'), createProduct);
productsRoutes.post('/:id', [isAuth], addToFavorite);
productsRoutes.put('/:id', [isAuth], upload.single('image'), updateProduct);
productsRoutes.delete('/:id', [isAuth], deleteProduct);

module.exports = productsRoutes;
