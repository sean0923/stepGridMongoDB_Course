const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association test', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'blogPostTitle', content: 'blogPostContent' });
    comment = new Comment({ content: 'commentContent' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it('check save joe blogPost comment with corret relation', (done) => {
    User.findOne({ name: 'joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'blogPostTitle');
        done();
      });
  });
});
