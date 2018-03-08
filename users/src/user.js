const mongoose = require('mongoose');
const PostSchema = require('../src/postSchema');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'],
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogpost',
    },
  ],
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  // I guess since it is pre
  // before removing the user find all blog posts related to user 
  // and then remove user ~ 

  // this === joe --> why we have to user function() instead of =>
  const BlogPost = mongoose.model('blogpost');
  BlogPost
    .remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
