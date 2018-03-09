const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('driver_controller test', () => {
  
  it('handles POST req to /api/drivers', (done) => {
    const reqBody = { content: 'I am a post contents' };
    request(app)
      .post('/api/drivers')
      .send(reqBody)
      .end((err, response) => {
        assert(JSON.stringify(reqBody) === JSON.stringify(response.body))
        done();
      });
  });
});
