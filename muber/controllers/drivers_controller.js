const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ yeah: 'yeah' });
  },

  create(req, res) {
    // const driver = new Driver(req.body);
    // driver.save().then((driver) => {
    //   res.send(req.driver);
    // });

    Driver.create(req.body)
      .then((driver) => {
        res.send(driver);
      })
      .catch((err) => {
        console.log('err: ', err);
        res.send(err);
      });
  },
};
