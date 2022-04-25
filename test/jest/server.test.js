const { api } = require('./util.js');

const hasObjectId = (data) => {
  for (var key in data) {
    if (key === "_id") {
      return true;
    } else if (typeof data[key] === 'object') {
      if (hasObjectId(data[key])) {
        return true;
      }
    }
  }
  return false;
};

describe('/products', () => {
  test('responds with 200 status given valid product id', () => {
    return api('/products/37337')
      .then((response) => {
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
      });
  });

  test('responds with 400 status given invalid product id', () => {
    return api('/products/15')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.response).toBeDefined();
        expect(err.response.status).toBe(400);
      })
  });

  test('responds with product data', () => {
    return api('/products/37337')
      .then(({data}) => {
        expect(data.id).toBe(37337);
        expect(data.name).toBeDefined();
        expect(data.slogan).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.category).toBeDefined();
        expect(data.features).toBeDefined();
      });
  });

  test('does not respond with related or styles data', () => {
    return api('/products/37317')
      .then(({data}) => {
        expect(data.related).toBeUndefined();
        expect(data.styles).toBeUndefined();
      });
  });

  test('does not include extraneous _id fields', () => {
    return api('/products/37319')
      .then(({data}) => {
        expect(hasObjectId(data)).toBe(false);
      })
  });
});

describe('/related', () => {
  test('responds with status code 200 given valid product id', () => {
    return api('/related/37321')
      .then((response) => {
        expect(response.status).toBe(200);
      })
  });

  test('responds with status code 400 given invalid product id', () => {
    return api('/related/44')
      .catch((err) => {
        expect(err.response.status).toBe(400);
      })
  });

  test('responds with an array', () => {
    return api('/related/37311')
      .then(({data}) => {
        expect(Array.isArray(data)).toBeTruthy();
      });
  });

  test('responds with valid product ids', () => {
    return api('/related/37311')
     .then(({data}) => {
       return Promise.all(data.map((id) => {
         return new Promise((resolve, reject) => {
           api(`products/${id}`)
             .then((response) => {
               resolve(response.status);
             })
             .catch((err) => {
               resolve(err.response.status);
             });
         });
       }));
     })
     .then((statusCodes) => {
       expect(statusCodes).toEqual(expect.not.arrayContaining([400]));
      });
  });
});

describe('/styles', () => {
  test('responds with 200 status given valid product id', () => {
    return api('/styles/37312')
      .then((response) => {
        expect(response.status).toBe(200);
      })
  });

  test('responds with 400 status given invalid product id', () => {
    return api('/styles/15')
      .catch((err) => {
        expect(err.response.status).toBe(400);
      })
  });

  test('responds using client-side expected format', () => {
    return api('/styles/37313')
      .then(({data}) => {
        expect(data.product_id).toEqual('37313');
        expect(data.results).toBeDefined();
      });
  });

  test('responds with client-readable styles data', () => {
    return api('/styles/37313')
      .then(({data}) => {
        expect(data.results[0].name).toBeTruthy();
        expect(data.results[0].style_id).toBeDefined();
        expect(data.results[0]['default?']).toBeDefined();
        expect(data.results[0].original_price).toBeTruthy();
        expect(data.results[0].sale_price).toBeDefined();
        expect(data.results[0].skus).toBeDefined();
        expect(data.results[0].photos).toBeDefined();
      });
  });

  test('provides a dummy photo object when a style has no photos', () => {
    return api('/styles/37312')
      .then(({data}) => {
        expect(data.results[0].photos).toEqual([{
            url: null,
            thumbnail_url: null
          }]);
      });
  });

  test('provides a dummy sku object when a style has no skus', () => {
    return api('/styles/37312')
      .then(({data}) => {
        expect(data.results[0].skus).toEqual({
          'null': {
            quantity: null,
            size: null
          }
        });
      });
  });

  test('does not include extraneous _id fields', () => {
    return api('/styles/37319')
      .then(({data}) => {
        expect(hasObjectId(data)).toBe(false);
      })
  });
});