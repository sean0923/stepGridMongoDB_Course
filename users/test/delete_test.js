const assert = require('assert');
const User = require('../src/user');

describe('Delete users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    joe.save()
      .then(() => {
        done();
      })
  });

  it('instance based method remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'joe'}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('Class based remove: remove()', (done) => {
    // user this when you want to remove bunch at once ~~
    User.remove({ name: 'joe' })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });


})