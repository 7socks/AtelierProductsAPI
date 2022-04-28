require('dotenv').config();
const express = require('express');
const db = require('../db/index.js');

const app = express();

const checkId = (req, res, next) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).send();
  } else {
    req.params.id -= 37310;
  }
  next();
};

const formatStyle = (style, i) => {
  if (style.photos.length === 0) {
    style.photos = [{
      url: null,
      thumbnail_url: null
    }];
  }

  if (style.skus.length === 0) {
    style.skus = {
      "null": {
        quantity: null,
        size: null
      }
    };
  }

  style.style_id = i + 1;

  return style;
};


app.get('/products/:id', checkId, (req, res) => {
  db.getProduct(req.params.id)
    .then((data) => {
      if (data) {
        data.id += 37310;
        res.status(200).send(data);
      } else {
        res.status(400).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.get('/styles/:id', checkId, (req, res) => {
  db.getStyles(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          product_id: (req.params.id + 37310).toString(),
          results: data.map((style, i) => {
            return formatStyle(style, i);
          })
        });
      } else {
        res.status(400).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
});

app.get('/related/:id', checkId, (req, res) => {
  db.getRelated(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).send(data.map((id) => {
          return id + 37310;
        }));
      } else {
        res.status(400).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
})

// Loader.io verification
app.use(express.static('public'));

app.listen(3300, () => {
  console.log('Listening on port 3300...');
  db.connect();
});