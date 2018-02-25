const assert = require('assert');
const User = require('../src/user');

describe('Reading user', () => {
  let sean;

  beforeEach(done => {
    sean = new User({ name: 'sean' })
    sean.save()
      .then(() => {
        done();
      });
  });

  it('finds all users with name of sean', (done) => {
    User.find({ name: 'sean'})
      .then((users) => {
        assert(users[0]._id.toString() === sean._id.toString());
        done()
      })
  });
});