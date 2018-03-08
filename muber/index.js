const app = require('./app');

const PORT = 3050;

app.get('/api', (req, res) => {
  res.send({ yeah: 'yeah ~~~~' });
});

app.listen(PORT, () => {
  console.log(`Listening to the port: ${PORT}`);
});
