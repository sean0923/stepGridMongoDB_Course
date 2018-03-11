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
      request(app).delete(`/api/drivers/${driver._id}`).end((err, resp) => {
        Driver.findOne({ email }).then(driver => {
          assert(driver === null);
          done();
        });
      });
    });
  });

  it('finds drivers near by center point', done => {
    const seattleDriver = new Driver({
      email: 'seattle@gmail.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.47, 47.61],
      },
    });

    const miamiDriver = new Driver({
      email: 'miami@gmail.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.25, 25.79],
      },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app).get('/api/drivers?lng=-80&lat=25').end((err, resp) => {
        assert(resp.body.length === 1);
        assert(resp.body[0].email === 'miami@gmail.com');
        done();
      });
    });
  });
});
