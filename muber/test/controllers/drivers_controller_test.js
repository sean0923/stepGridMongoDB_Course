const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('driver_controller test', () => {
  it('handles POST req to /api/drivers', done => {
    const reqBody = { email: 'some@yeah.com' };
    Driver.count().then(prevCount => {
      request(app).post('/api/drivers').send(reqBody).end((err, response) => {
        Driver.count().then(newCount => {
          assert(prevCount + 1 === newCount);
          done();
        });
      });
    });
  });

  it('handles PUT req to /api/drivers/:id', done => {
    const email = 'w@w.com';
    const driver = new Driver({ email, driving: false });
    driver.save(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, resp) => {
          Driver.findOne({ email }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('handles DELETE req to /api/drivers/:id', done => {
    const email = 'w@w.com';
    const driver = new Driver({ email, driving: false });
    driver.save(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, resp) => {
          Driver
            .findOne({ email })
            .then(driver => {
              assert(driver === null)
              done();
            });
        });
    });
  });

});
