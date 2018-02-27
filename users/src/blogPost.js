const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogpost', BlogPostSchema);

module.exports = BlogPost;
