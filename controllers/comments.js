const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.commentInput,
        likes: 0,
        userName: req.user.userName,
        userId: req.user,
        post: req.params.postId,
        commentID: req.params.commentId
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

      if(!comment.usersLiked.includes(req.user.userName)) {

        await Comment.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
           $push: { usersLiked: req.user.userName }
          }
        )
      
        await Comment.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
  
      console.log("Likes +1 from " + req.user.userName);
      }
      res.redirect(`/feed/getPost/${comment.post}#comments`);
    } catch (err) {
      console.log('error here at contoller')
      console.log(err);
    }
  }
}