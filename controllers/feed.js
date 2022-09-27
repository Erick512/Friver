const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getFeed: async (req, res) => {
      try {
        const posts = await Post.find().sort({ createdAt: "desc" }).lean();
        res.render("feed.ejs", { posts: posts, user: req.user});
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
            user: req.user.id,
          });
          console.log("Post has been added!");
          res.redirect('/feed');
        } catch (err) {
          console.log(err);
        }
      },
      likeFeedPost: async (req, res) => {

        try {

          const post = await Post.findById(req.params.id)

          if(!post.usersLiked.includes(req.user.userName)) {

            await Post.findOneAndUpdate(
              {
                _id: req.params.id
              },
              {
               $push: { usersLiked: req.user.userName }
              }
            )

            await Post.findOneAndUpdate(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
              }
            );
            console.log("Likes +1 from " + req.user.userName);
          }
            res.redirect(`/feed#${post.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {

      try {

        const post = await Post.findById(req.params.id)

        if(!post.usersLiked.includes(req.user.userName)) {

          await Post.findOneAndUpdate(
            {
              _id: req.params.id
            },
            {
             $push: { usersLiked: req.user.userName }
            }
          )

          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1 from " + req.user.userName);
        }
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
    deletePost: async (req, res) => {
      try {
        // Find post by id
        let post = await Post.findById({ _id: req.params.id });
        // Delete image from cloudinary
        if(post.cloudinaryId){
          result = await cloudinary.uploader.destroy(post.cloudinaryId) 
        } else {
          result = ''
        }
        //delete comments width post id from db

        await Comment.deleteMany({ post: req.params.id })

        // Delete post from db
        await Post.deleteOne({ _id: req.params.id });
        console.log("Deleted Post");
        res.redirect("/feed");
      } catch (err) {
        console.log(err)
        res.redirect("/feed");
      }
    }
}