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
})