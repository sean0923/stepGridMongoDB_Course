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
})