const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        text: req.body.commentInput,
        likes: 0,
        userName: req.user.userName,
        user: req.user,
        post: req.params.commentId ? undefined : req.params.postId ,
        comment: req.params.commentId
      });
      console.log("Comment has been added!");
      res.redirect(`/feed/getPost/${req.params.postId}`);
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
  
      console.log("Likes +1 from " + req.user.userName);
      res.redirect(`/feed/getPost/${comment.post}#comments`);
    } catch (err) {
      console.log('error here at contoller')
      console.log(err);
    }
  }
}