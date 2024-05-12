const { setError } = require('../../config/error');
const { deleteFile } = require('../../util/deleteFile');
const Product = require('../model/product');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    return next(setError(400, "can't find products 😱"));
  }
};

const getProductByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return next(setError(400, "can't find product 😱"));
  }
};
const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.image = req.file.path;
    }
    const productBD = await newProduct.save();
    return res.status(201).json(productBD);
  } catch (error) {
    return next(setError(400, "can't create product 😱"));
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldProduct = await Product.findById(id);
    const newProduct = new Product(req.body);

    if (req.file) {
      newProduct.image = req.file.path;
      if (oldProduct.image){
        deleteFile(oldProduct.image)
      }
    }

    newProduct._id = id;

    // Agregar nuevas categorías si se proporcionan, asegurando que sean únicas
    if (newProduct.categories) {
      newProduct.categories = [
        ...new Set([...oldProduct.categories, ...newProduct.categories]),
      ];
    }

    // Actualizar el producto con las nuevas categorías
    const productUpdated = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    return res.status(200).json(productUpdated);
  } catch (error) {
    return next(setError(400, "can't update products 😱"));
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return next(setError(400, "can't delete products 😱"));
  }
};

module.exports = {
  getAllProducts,
  getProductByid,
  createProduct,
  updateProduct,
  deleteProduct,
};
