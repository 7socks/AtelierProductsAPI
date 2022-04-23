const { api } = require('./util.js');

describe('Product API', () => {
  test('responds with high-indexed product data in < 50ms', () => {
    api('/products/999999')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  }, 50);

  test('rejects invalid request within < 50ms', () => {
    return api('/products/2000000')
    .catch((err) => {
      expect(err.response.status).toBe(400);
    });
  }, 50);
});

describe('Styles API', () => {
  test('responds with high-indexed styles data in < 50ms', () => {
    return api('/styles/999999')
    .then((response) => {
      expect(response.status).toBe(200);
    });
  }, 50);

  test('rejects invalid request within < 50ms', () => {
    return api('/styles/2000000')
    .catch((err) => {
      expect(err.response.status).toBe(400);
    });
  }, 50);
});

describe('Related API', () => {
  test('responds with high-indexed related data in < 50ms', () => {
    return api('/related/999999')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  }, 50);

  test('rejects invalid request within < 50ms', () => {
    return api('/related/2000000')
    .catch((err) => {
      expect(err.response.status).toBe(400);
    });
  }, 50);
});


