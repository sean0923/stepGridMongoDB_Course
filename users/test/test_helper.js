const mongoose = require('mongoose');

// I did not get warning but just in case ~
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      console.log('Warning', err);
    })
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Reday to run the next test
    done();
  })
})