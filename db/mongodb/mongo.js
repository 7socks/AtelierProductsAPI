const mongoose = require('mongoose');

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