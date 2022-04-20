const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/products');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{
    feature: String,
    value: mongoose.Schema.Types.Mixed
  }],
  styles: [{
    id: Number,
    name: String,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String
    }],
    skus: [{
      quantity: Number,
      size: String
    }]
  }],
  related: [{
    id: Number
  }]
});

const product = mongoose.model('Product', productSchema);

module.exports.getProduct = (id) => {
  return new Promise((resolve, reject) => {
    product.findOne({id}, (data, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};