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
        };
      } else {
        return null;
      }
    });
};

module.exports.getRelated = (id) => {
  return get(id)
    .then((product) => {
      return product ? product.related : [];
    });
}

module.exports.getStyles = (id) => {
  return get(id)
    .then((product) => {
      if (product) {
        var results = [];
        for (var i = 0; i < product.styles.length; i++) {
          var style = product.styles[i];
          results.push({
            name: style.name,
            original_price: style.original_price,
            sale_price: style.sale_price,
            'default?': !!style.default_style,
            photos: style.photos.slice(),
            skus: style.skus.slice()
          })
        }
        return results;
      } else {
        return null;
      }
    });
};