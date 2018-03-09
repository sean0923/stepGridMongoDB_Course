const assert = require('assert');
const request = require('supertest');

const app = require('../app');

describe('app test', () => {
  it('handles a GET request to /api', (done) => {
    request(app).get('/api').end((err, response) => {
      assert(response.body.yeah === 'yeah');
      done();
    });
  });
});
