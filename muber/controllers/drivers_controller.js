const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ yeah: 'yeah' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    // http://~~~.com?lng=80?lat=20

    // - .geoNear DOES NOT WORK ANYMORE !!! -----------------------------------------------------
    // Driver.geoNear(
    //   { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
    //   { spherical: true, maxDistance: 200000 } // maxDistance unite: meters
    // )
    // ---------------------------------------------------------------------------------
    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          spherical: true,
          distanceField: 'dist',
          maxDistance: 200000,
        },
      },
    ])
      .then(drivers => {
        res.send(drivers);
      })
      .catch(next);
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
