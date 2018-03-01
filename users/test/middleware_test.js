const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    blogPost = new BlogPost({ title: 'blogPostTitle', content: 'blogPostContent' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('remove dangling blogpost when user is removed', (done) => {

    // BlogPost.count()
    //   .then((count) => console.log('first count: ', count));

    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        // console.log('count: ', count);
        assert(count === 0);
        done();
      })

  })
})