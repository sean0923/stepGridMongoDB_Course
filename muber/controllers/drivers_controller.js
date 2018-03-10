const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ yeah: 'yeah' });
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => {res.send(driver);})
      .catch(next);
  },
};
