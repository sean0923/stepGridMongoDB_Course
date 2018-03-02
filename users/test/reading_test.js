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

    Promise.all(sean.save(), tim.save(), uim.save(), vim.save(), wim.save()).then(() => {
      done();
    });
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
});
