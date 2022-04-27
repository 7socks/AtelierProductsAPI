const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
const { Product } = require('./models.js');
const options = {
  dbName: 'products'
};

module.exports.connect = async function () {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}`, options)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.error(err);
    });
};

const get = async (id) => {
  return Product.findOne({ id: id }).lean();
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
        return product.styles.map((style) => {
          return {
            name: style.name,
            original_price: style.original_price,
            sale_price: style.sale_price,
            'default?': !!style.default_style,
            photos: style.photos,
            skus: style.skus
          };
        });
      } else {
        return null;
      }
    });
};