const { isAuth } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getAllProducts,
  getProductByid,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/product');

const productsRoutes = require('express').Router();

productsRoutes.get('/', getAllProducts);
productsRoutes.get('/:id', getProductByid);
productsRoutes.post('/', [isAuth], upload.single('image'), createProduct);
productsRoutes.put('/:id', [isAuth], upload.single('image'), updateProduct);
productsRoutes.delete('/:id', [isAuth], deleteProduct);

module.exports = productsRoutes;
