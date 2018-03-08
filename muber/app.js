const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.send({ yeah: 'yeah' });
});

module.exports = app;
