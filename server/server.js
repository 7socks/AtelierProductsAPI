const express = require('express');
const db = require('../db/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));




app.listen(3300, () => {
  console.log('Listening on port 3300');
});