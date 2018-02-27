const mongoose = require('mongoose');
const PostSchema = require('../src/postSchema')
const { Schema } = mongoose;


const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogpost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
