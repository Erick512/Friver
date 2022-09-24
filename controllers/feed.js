const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getFeed: async (req, res) => {
      try {
        const posts = await Post.find().sort({ createdAt: "desc" }).lean();
        res.render("feed.ejs", { posts: posts });
      } catch (err) {
        console.log(err);
      }
    },
    createPost: async (req, res) => {
        try {
          // Upload image to cloudinary

          let result

          if(req.file){
            result = await cloudinary.uploader.upload(req.file.path) 
          } else {
            result = ''
          }
    
          await Post.create({
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            caption: req.body.caption,
            likes: 0,
            userName: req.user.userName,
            userID: req.user.id,
          });
          console.log("Post has been added!");
          res.redirect('/feed');
        } catch (err) {
          console.log(err);
        }
      },
    likePost: async (req, res) => {

        try {

          const post = await Post.findById(req.params.id)

            await Post.findOneAndUpdate(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
              }
            );
            console.log("Likes +1");
            res.redirect(`/getPost/${post.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    likeFeedPost: async (req, res) => {

        try {

          const post = await Post.findById(req.params.id)

            await Post.findOneAndUpdate(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
              }
            );
            console.log("Likes +1");
            res.redirect(`/feed#${post.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {

      try {

        const post = await Post.findById(req.params.id)

          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/feed/getPost/${post.id}`);
      } catch (err) {
          console.log(err);
      }
    },
    getPost: async (req, res) => {
      try {

        const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
        const post = await Post.findById(req.params.id)
        res.render("post.ejs", {post: post, user: req.user, comments: comments})

      } catch(err){
        console.log(err)
      }
    },
}