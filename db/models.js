const mongoose = require('mongoose');

class OptionalString extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'OptionalString');
  }

  cast(val) {
    if (val === 'null') {
      return null;
    } else if (typeof val === 'string') {
      return val;
    } else {
      throw new Error('OptionalString: ' + JSON.stringify(val) + ' is not null or a string');
    }
  }
}

mongoose.Schema.Types.OptionalString = OptionalString;

const photoSchema = new mongoose.Schema({
  url: OptionalString,
  thumbnail_url: OptionalString
});

const skuSchema = new mongoose.Schema({
  quantity: Number,
  size: String
});

const styleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sale_price: OptionalString,
  original_price: String,
  default: Boolean,
  photos: {
    type: [ photoSchema ],
    default: []
  },
  skus: {
    type: [ skuSchema ],
    default: []
  }
});

const featureSchema = new mongoose.Schema({
  feature: String,
  value: OptionalString
});

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: {
    type: [ featureSchema ],
    default: []
  },
  related: {
    type: [ Number ],
    default: []
  },
  styles: {
    type: [ styleSchema ],
    default: []
  }
});

module.exports = {
  Product: mongoose.model('product', productSchema)
}