const assert = require('assert');
const User = require('../src/user');

describe('Update test', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ 
      name: 'joe',
      postCount: 0,
    });
    joe.save()
      .then(() => {
        done();
      })
  })

  // helper method
  const assertUpdatedName = (operation, updatedName, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === updatedName);
        done()
      })
  }

  // Model instance update methods
  it('Instance update method: set and save -> joe -> <updatedName>', (done) => {
    const updatedName = 'yoyo';
    joe.set('name', updatedName);
    assertUpdatedName(joe.save(), updatedName, done);
  })

  it('Instance update method: update -> joe -> <updatedName>', (done) => {
    const updatedName = 'uiui';
    assertUpdatedName(joe.update({ name: updatedName}), updatedName, done);
  })

  // Model class update methods
  it('Class modal update method: update -> joe -> <updatedName>', (done) => {
    const updatedName = 'class 1';
    assertUpdatedName(
      User.update({ name: 'joe'}, { name: updatedName }),
      updatedName,
      done
    )
  })

  it('Class modal update method: findOneAndUpdate -> joe -> <updatedName>', (done) => {
    const updatedName = 'class 2';
    assertUpdatedName(
      User.findOneAndUpdate({ name: 'joe'}, { name: updatedName }),
      updatedName,
      done
    )
  })

  it('Class modal update method: findByIdAndUpdate -> joe -> <updatedName>', (done) => {
    const updatedName = 'class 3';
    assertUpdatedName(
      User.findByIdAndUpdate(joe._id, { name: updatedName }),
      updatedName,
      done
    )
  })

  // Using update operator
  it('Using update operator to increment postCount by 1', (done) => {
    User.update({ name: 'joe'}, {$inc: { postCount: 1 }})
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      })
  }) 

})