const express = require('express');
const db = require('../db/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/products/:id', (req, res) => {
  db.getProduct(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.get('/styles/:id', (req, res) => {
  db.getStyles(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
});

app.get('/related/:id', (req, res) => {
  db.getProduct(id)
    .then((data) => {
      res.status(200).send(data.related);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
})


app.listen(3300, () => {
  console.log('Listening on port 3300');
});