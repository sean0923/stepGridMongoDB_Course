const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('driver_controller test', () => {
  it('handles POST req to /api/drivers', (done) => {
    const reqBody = { email: 'some@yeah.com' };
    Driver.count().then((prevCount) => {
      request(app).post('/api/drivers').send(reqBody).end((err, response) => {
        Driver.count().then((newCount) => {
          assert(prevCount + 1 === newCount);
          done();
        });
      });
    });
  });
});
