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

  it('Class based remove: findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'joe'})
      .then(() => User.find({ name: 'joe' }))
      .then((users) => {
        assert(users.length === 0);
        done();
      })
  });

  it('Class based remove: findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id.toString()) // oh ... so you can either pass obj or str
      .then(() => User.find({ name: 'joe' }))
      .then((users) => {
        assert(users.length === 0);
        done();
      })
  });

})