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

  const assertUpdatedName = (operation, updatedName, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === updatedName);
        done()
      })
  }

  it('Instance update method: set and save -> joe -> <updatedName>', (done) => {
    const updatedName = 'yoyo';
    joe.set('name', updatedName);
    assertUpdatedName(joe.save(), updatedName, done);
  })

  it('Instance update method: update -> joe -> <updatedName>', (done) => {
    const updatedName = 'uiui';
    assertUpdatedName(joe.update({ name: updatedName}), updatedName, done);
  })
})