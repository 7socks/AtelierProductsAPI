const axios = require('axios');
const host = 'http://localhost:3300'

module.exports.api = (endpoint) => {
  return axios({
    method: 'GET',
    baseURL: host,
    url: endpoint
  });
};