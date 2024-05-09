const { setError } = require('../../config/error');
const Category = require('../model/category');

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find().populate('products');
    return res.status(200).json(allCategories);
  } catch (error) {
    return next(setError(400, "can't find categories 😱"));
  }
};

const getCategoryByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('products');
    return res.status(200).json(category);
  } catch (error) {
    return next(setError(400, "can't find Category 😱"));
  }
};
const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const categoryBD = await newCategory.save();
    return res.status(201).json(categoryBD);
  } catch (error) {
    return next(setError(400, "can't create Category 😱"));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCategory = await Category.findById(id);

    const newCategory = new Category(req.body);

    newCategory._id = id;

    if (newCategory.products){
        newCategory.products = [...oldCategory.products, ...newCategory.products]

    }
    const categoryUpdated = await Category.findByIdAndUpdate(id, newCategory, {
      new: true,
    });
    return res.status(200).json(categoryUpdated);
  } catch (error) {
    return next(setError(400, "can't update category 😱"));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json(deleteCategory);
  } catch (error) {
    return next(setError(400, "can't delete category 😱"));
  }
};
module.exports = {
  getAllCategories,
  getCategoryByid,
  createCategory,
  updateCategory,
  deleteCategory,
};
