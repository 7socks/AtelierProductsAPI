const fs = require('fs');
const path = require('path');
const csv = require('@fast-csv/parse')
const mongoose = require('mongoose');
const { Product, Style } = require('./models.js');

const delay = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};


const readStream = function (model) {
  let log = 0;
  let filename = path.join(__dirname, models[model].raw);

  const stream = fs.createReadStream(filename);
  console.log('-- Fetching', model, 'stream --');

  return new Promise((resolve, reject) => {
    csv.parseStream(stream, {headers: true})
    .on('error', err => console.error(err))
    .on('data', async (row) =>{
      const parseRecord = models[model].parser;
      await parseRecord(row);

      log++;
      if (log % 5000 === 0) {
        console.log(log, 'records parsed.');
        console.log('Most recent:', row);
      }
    })
    .on('end', () => {
      console.log('-- End of stream --')
      resolve();
    });
  });
};

const parseProduct = (record) => {
  record.features = [];
  record.related = [];
  return Product.create(record);
};

const parseFeature = ({product_id, feature, value}) => {
  var feature = { feature, value };
  return Product.findOne({id: product_id})
    .then((product) => {
      var features = product.features.concat([feature]);
      return Product.updateOne({_id: product._id}, {features: features})
    })
    .catch((err) => {
      console.error(err);
    });
};

const parseRelated = ({current_product_id, related_product_id}) => {
  return Product.findOne({id: current_product_id})
    .then((product) => {
      var related = product.related.concat([related_product_id])
      return Product.updateOne({_id: product._id}, {related: related})
    })
    .catch((err) => {
      console.error(err);
    });
};

const parseStyle = (record) => {
  var style = {
    id: record.id,
    product_id: record.productId,
    name: record.name,
    sale_price: record.sale_price,
    original_price: record.original_price,
    default: record.default_style,
    photos: [],
    skus: []
  };
  return Style.create(style);
};

const parsePhoto = ({styleId, url, thumbnail_url}) => {
  var photos = {url, thumbnail_url};
  return Style.findOne({id: styleId})
    .then((style) => {
      var gallery = style.photos.concat([photos]);
      return Style.updateOne({_id: style._id}, {photos: gallery});
    })
    .catch((err) => {
      console.error(err);
    });
}

const parseSku = ({styleId, size, quantity}) => {
  var sku = {size, quantity};
  return Style.findOne({id: styleId})
    .then((style) => {
      var skus = style.skus.concat([sku]);
      return Style.updateOne({_id: style._id}, {skus: skus});
    })
    .catch((err) => {
      console.error(err);
    })
};

const models = {
  product: {
    raw: './raw/product.csv',
    parser: parseProduct
  },
  features: {
    raw: './raw/features.csv',
    parser: parseFeature
  },
  related: {
    raw: './raw/related.csv',
    parser: parseRelated
  },
  styles: {
    raw: './raw/styles.csv',
    parser: parseStyle
  },
  photos: {
    raw: './raw/photos.csv',
    parser: parsePhoto
  },
  skus: {
    raw: './raw/skus.csv',
    parser: parseSku
  }
};

const seed = async function () {
  await readStream('product');
  await readStream('features');
  await readStream('related');
  await readStream('styles');
  await readStream('photos');
  await readStream('skus');

  console.log('Seeding complete.');
};

seed();