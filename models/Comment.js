const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  commentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  // replies: [
  //   {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: 'Comment'
  //   }
  // ],
}, {timestamps: true});

// CommentSchema.virtual('comments', {
//   ref: 'Comment',
//   localField: '_id',
//   foreignField: 'comment',
//   autopopulate: true
// });

// CommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Comment", CommentSchema);