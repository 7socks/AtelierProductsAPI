const mongoose = require('mongoose');
const { Product, Style } = require('./models.js');

const get = (id) => {
  return Product.findOne({ id: id })
    .then((product) => {
      return product ? product : null;
    });
};

module.exports.getProduct = (id) => {
  return get(id)
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
        }
      } else {
        return null;
      }
    });
};

module.exports.getRelated = (id) => {
  return get(id)
    .then((product) => {
      return product ? product.related : null;
    });
}

module.exports.getStyles = (id) => {
  return get(id)
    .then((product) => {
      console.log(product.styles);
      return product ? product.styles : null;
    });
};