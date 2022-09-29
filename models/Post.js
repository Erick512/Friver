const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true
  },
  // usersLiked: {
  //   type: [String],
  //   required: false,
  // },
  userName: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: {virtuals: true}
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});


module.exports = mongoose.model("Post", PostSchema);