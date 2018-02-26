const assert = require('assert');
const User = require('../src/user');

describe('Validation tests', () => {
  it('Throw error if name is not provided ', (done) => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
    done();
  })

  it('Throw error if name is less than 2 characters', (done) => {
    const user = new User({name: 'al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
    done();
  })

  it('Not allow saving invalid user', (done) => {
    const user = new User({ name: 'al' });
    user.save()
      .then(() => {
        console.log('saved')
        done();
      })
      .catch((err) => {
        const { message } = err.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      })
  })
})