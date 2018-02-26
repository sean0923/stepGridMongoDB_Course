const assert = require('assert');
const User = require('../src/user');



describe('Subdocument test', () => {
  it('can create a subdocument', (done) => {
    const joe = new User ({
      name: 'joe',
      posts: [{title: 'PostTitle'}],
    });

    joe.save()
      .then((what) => {
        return User.findOne({name: 'joe'})
      })
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      })
  });

  it('Add subdocument for an exsiting user', (done) => {
    const joe = new User({
      name: 'joe',
    });

    joe.save()
      .then(() => User.findOne({ name: 'joe'}))
      .then((user) => {
        return user.update({ posts: [{ title: 'PostTitle' }], })
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
      
  });
})