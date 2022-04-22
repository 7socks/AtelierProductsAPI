const mongoose = require('mongoose');
const { Product, Style } = require('./models.js');

module.exports.getProduct = (id) => {
  return Product.findOne({id: id})
    .then((product) => {
      if (product) {
        return {
          id: product.id,
          name: product.name,
          description: product.name
        };
      } else {
        return null;
      }
    });
};

name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: {
    type: [ featureSchema ],
    default: []
  },
  related
module.exports.getStyles = (id) => {
  return Style.find({product_id: id})
    .then((styles) => {
      // format results before returning
      return styles;
    })
};