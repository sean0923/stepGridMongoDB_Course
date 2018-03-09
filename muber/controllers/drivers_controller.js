module.exports = {
  greeting(req, res) {
    res.send({ yeah: 'yeah' });
  },

  create(req, res) {
    res.send(req.body);
  },
};
