const { connectDB } = require('../../config/db');
const Product = require('../model/product');
const Category = require('../model/category');
const seed = require('./seedData');
connectDB()

const cleanCollections = async () => {
  await Category.collection.drop();
  await Product.collection.drop();

  console.log('>>> Colecciones limpias');
};

const saveDocuments = async () => {
  try {
    const categories = await Category.insertMany(seed.categories);
    console.log('>>> categorias insertadas con éxito!');

      const products = await Product.insertMany(seed.products);
      console.log('>>> productos insertados con éxito!');
      
    // Actualizar las categorias con los productos correspondientes
    await Promise.all(
      categories.map(async (category) => {
        const categoryProducts = products.filter(
          (product) => product.categories.includes(category.name.toLowerCase())
        );
        await Category.updateOne(
          { _id: category._id },
          { $set: { products: categoryProducts.map((product) => product._id) } }
        );
      })
    );

    console.log('>>> Documentos guardados con éxito!');
    return { categories, products };

  } catch (error) {
    console.error('Error guardando documentos:', error);
  }
};

module.exports = {
  cleanCollections,
  saveDocuments,
};
