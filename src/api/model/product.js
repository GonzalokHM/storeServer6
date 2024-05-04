const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    categories: [{
      type: String,
      require: false,
      enum: ['Hombre', 'Mujer', 'outlet', 'uniSex', 'hogar'],
    }],
    price: { type: Number, require: true },
    stock: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

const Product = mongoose.model('products', productSchema);

module.exports = Product;
