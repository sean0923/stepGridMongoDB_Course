const assert = require('assert');
const User = require('../src/user');

describe('Update test', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    joe.save()
      .then(() => {
        done();
      })
  })

  it('Instance update method: set and save -> joe to yeah', (done) => {
    joe.set('name',  'yeah');
    joe.save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'yeah');
        done()
      })
  })
})