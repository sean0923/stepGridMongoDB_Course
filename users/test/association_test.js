const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association test', () => {
  let joe;
  let blogPost;
  let comment;

  beforeEach(done => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'blogPostTitle', content: 'blogPostContent'})
    comment = new Comment({ content: 'commentContent'})

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  });

  it.only('check save joe blogPost comment with corret relation', (done) => {
    User.findOne({name: 'joe'})
      .then((user) => {
        console.log('user: ', user);
        done();
      })
  })

});
