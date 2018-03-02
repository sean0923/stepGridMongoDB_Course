const assert = require('assert');
const User = require('../src/user');

describe('Reading user', () => {
  let sean, tim, uim, vim, wim;

  beforeEach((done) => {
    sean = new User({ name: 'sean' });
    tim = new User({ name: 'tim' });
    uim = new User({ name: 'uim' });
    vim = new User({ name: 'vim' });
    wim = new User({ name: 'wim' });
    // sean.save()
    //   .then(() => {
    //     done();
    //   })
    Promise.all([sean.save(), tim.save(), uim.save(), vim.save(), wim.save()])
      .then((data) => {
        done();
      })
  });

  it('finds all users with name of sean', (done) => {
    User.find({ name: 'sean' }).then((users) => {
      assert(users[0]._id.toString() === sean._id.toString());
      done();
    });
  });

  it('find one user name sean', (done) => {
    User.findOne({
      _id: sean._id,
    }).then((user) => {
      assert(user.name === 'sean');
      done();
    });
  });

  it('be able to skip and limit the result', (done) => {
    User.find({}).sort({ name: 1 }).skip(1).limit(2).then((users) => {
      console.log('users.length: ', users.length);
      console.log('users[0].name: ', users[0].name);
      console.log('users[1].name : ', users[1].name );
      assert(users.length === 2);
      assert(users[0].name === 'tim');
      assert(users[1].name === 'uim');
      done();
    });
  });
});
