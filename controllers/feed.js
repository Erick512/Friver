const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Surge = require('../models/Surge')
const cloudinary = require('../middleware/cloudinary');


function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) +  interval == 1 ? " yr" : " yrs";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " month" : " months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " day" : " days");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " hr" : " hrs");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " min" : " mins");
  }
  return Math.floor(seconds) + " sec";
}

function lessThanHr(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return false
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return false
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return false
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return true
  }
  interval = seconds / 60;
  if (interval > 1) {
    return true
  }
  return true
}


module.exports = {
    getFeed: async (req, res) => {

      try {
        const posts = await Post.find().sort({ createdAt: "desc" }).populate('likes').lean();
        let surges = await Surge.find().sort({createdAt: "desc"}).lean()

        posts.map(post => {
          post.createdAt = timeSince(post.createdAt)
        })

        //get surges that are under an hr new and format their date

        surges = surges.filter( surge => lessThanHr(surge.createdAt) )

        surges.map(surge => {
          surge.createdAt = timeSince(surge.createdAt)
        })

        res.render("feed.ejs", { posts: posts, surges:surges, user: req.user});
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

        //format created at date
        const createdAt = timeSince(post.createdAt)

        const comments = post.comments

        res.render("post.ejs", {post: post, createdAt: createdAt, user: req.user, comments: comments})

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
    },
    createSurge: async (req, res) => {
      try {

        await Surge.create({
          amount: req.body.amount,
          location: req.body.location,
          userName: req.user.userName,
          user: req.user,
        })

        console.log('created surge post')
        res.redirect('/feed')

      } catch(err) {
        console.log(err)
      }
    }
}