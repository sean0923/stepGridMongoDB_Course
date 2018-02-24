const assert = require('assert');
const User = require('../src/user');

describe('Createing records', () => {
  it('saves a user', (done) => {
    const sean = new User({ name: 'Sean'});
    sean.save()
      .then(() => {
        assert(sean.isNew);
        done();
      });
    
  })
})