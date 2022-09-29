const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopluate: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: {virtuals: true}
});

CommentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

CommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Comment", CommentSchema);