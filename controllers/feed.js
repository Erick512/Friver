const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getFeed: async (req, res) => {

      try {
        const posts = await Post.find().sort({ createdAt: "desc" }).populate('likes').lean();
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
          const obj = { user: req.user.id, post: req.params.id };
          if ((await Like.deleteOne(obj)).deletedCount) {
            console.log("Likes -1");
            return res.redirect(`/feed#${req.params.id}`);
          }
          await Like.create(obj);

          console.log("Likes +1 from " + req.user.userName);
          res.redirect(`/feed#${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {

      try {

        const obj = { user: req.user.id, post: req.params.id };
          if ((await Like.deleteOne(obj)).deletedCount) {
            console.log("Likes -1");
            return res.redirect(`/feed/getPost/${req.params.id}`);
          }
          await Like.create(obj);
          console.log("Likes +1 from " + req.user.userName);

          res.redirect(`/feed/getPost/${req.params.id}`);
      } catch (err) {
          console.log(err);
      }
    },
    getPost: async (req, res) => {
      try {
        
        const post = await Post.findById(req.params.id).populate('likes').populate({
          path: 'comments',
          populate: { path: 'user' }
        })
        const comments = post.comments
        res.render("post.ejs", {post: post, user: req.user, comments: comments})

      } catch(err){
        console.log(err)
      }
    },
    deletePost: async (req, res) => {
      try {

        // Find post by id
        let post = await (await Post.findById({ _id: req.params.id })).populate('comments');
        // Delete image from cloudinary
        if(post.cloudinaryId){
          result = await cloudinary.uploader.destroy(post.cloudinaryId) 
        } else {
          result = ''
        }

        //delete comments width post id from db

        const commentIDs = [];
        const comments = post.comments;
        while (comments.length) {
          const comment = comments.pop();
          comments.push(...comment.comments);
          commentIDs.push(comment.id);
        }

        await Comment.deleteMany({ _id: { $in: commentIDs}})

        // delete likes 

        await Like.deleteMany({ post: req.params.id });

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