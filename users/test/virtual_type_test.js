const assert = require('assert');
const User = require('../src/user');

describe('Virtual type test', () => {

  it('counts the number of post', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'yeah' }]
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      })
  })
})