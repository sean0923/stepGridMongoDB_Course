const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ yeah: 'yeah' });
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },

  update(req, res, next) {
    Driver.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Driver.findById(req.params.id))
      .then(updatedDriver => {
        res.send(updatedDriver);
      })
      .catch(next);
  },

  delete(req, res, next) {
    Driver.findByIdAndRemove(req.params.id)
      .then(deletedDriver => {
        // res.status(204).send(deletedDriver);
        res.send(deletedDriver);
      })
      .catch(next);
  },
};
