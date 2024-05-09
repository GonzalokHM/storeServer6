const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: 'products' }],
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

const caategory = mongoose.model('categories', categorySchema);

module.exports = caategory;
