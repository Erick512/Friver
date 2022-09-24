const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.commentInput,
        likes: 0,
        userName: req.user.userName,
        userId: req.user,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/feed/getPost/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {

      const comment = await Comment.findById(req.params.id)
      
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log(comment.post.id)
      console.log(req.params.id)
      console.log("Likes +1");
      res.redirect(`/feed/getPost/${comment.post}`);
    } catch (err) {
      console.log('error here at contoller')
      console.log(err);
    }
  }
}