const mongoose = require('mongoose');
const { Product, Style } = require('./models.js');

module.exports.getProduct = (id) => {
  return Product.findOne({id: id})
    .then((product) => {
      if (product) {
        return {
          id: product.id,
          name: product.name,
          slogan: product.slogan,
          description: product.name,
          category: product.category,
          default_price: product.default_price,
          features: product.features
        };
      } else {
        return null;
      }
    });
};

module.exports.getRelated = (id) => {
  return Product.findOne({product_id: id})
    .then((product) => {
      if (product) {
        return product.related;
      } else {
        return null;
      }
    });
}

module.exports.getStyles = (id) => {
  return Style.find({product_id: id})
    .then((styles) => {
      // format results before returning
      return styles;
    })
};