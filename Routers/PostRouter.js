const express = require('express');
require("../dbConnection");
const postModel = require('../Models/PostModel');
const auth = require('../backendAuth');
const postRouter = express.Router();




// get all posts from database
postRouter.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.find({});
        if(posts.length === 0){
            res.status(200).send({message: 'empty database'});
        } else {
            res.status(200).send({posts: posts});
        }
        

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
})

// get a single post from database
postRouter.get('/posts/:id',  async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(post.length === 0){
            res.status(200).send({message: 'empty database'}) 
        } else {
            res.status(200).send({post: post});
        }
        

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
})

// create new posts
postRouter.post('/posts', auth, async (req, res) => {
    const date = new Date();
    const postData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        "postedBy.userId": req.user._id,
        "postedBy.username": req.user.name,
        likes: 0,
        date: date

    }
    const newpost = new postModel(postData);
    console.log(newpost)

    try {
        await newpost.save();
        res.status(201).send({message: "new posts created", post: newpost});

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
});

// get all the postsed that that were made by the logged in and authenticated user
postRouter.get('/user/profile/myPosts', auth, async(req, res) => {
    console.log(req.user.uid);
    try {
        const posts = await postModel.find({"postedBy.userId": req.user._id}); // find using the authenticated user id
        if(posts.length === 0 ){
            res.status(204).send({message: "you have not posted any posts"});
        }  else {
            res.status(200).send({posts: posts});
        }

    } catch (e) {
        res.status(500).send({message: "server error"});
    }

});

// delete an posts of the authenticated user using their id
postRouter.delete('/posts/delete/:id', auth, async (req, res) => {
   try {
       const posts = await postModel.findByIdAndDelete(req.params.id);
       console.log(posts);
       if(!posts) {
           res.status(404).send({message: "can't delete an posts that doesn't exist"});
       } else {
           res.status(200).send({message: "posts deleted"});
       }

   } catch (e) {
       res.status(500).send({message: 'server error'});
   }
});

// update an posts using id
postRouter.put('/posts/update/:id', auth, async (req, res) => {
    const incoming_updates = Object.keys(req.body);
    const expected_updates = ["title","description","category"];
    const validUpdate = incoming_updates.every((update) => expected_updates.includes(update));
    if(validUpdate){
        try {
            const posts = await postModel.findByIdAndUpdate(req.params.id, req.body);
            if(!posts){
                res.status(404).send({message: "cant' update an posts that doesn't exist"});
            } else {
                await posts.save();
                res.status(200).send({message: "posts data updated"});

            }
        } catch (e){
            res.status(500).send({message: "server error"});
        }

    } else {
        res.status(500).send({message: "invalid updates"});
    }
});


// add comment to the post
postRouter.post('/posts/comment/:id', auth, async (req,res) => {
    const data = { 
        commentDesc: req.body.comment,
        userId: req.user._id,
        username: req.user.name
    }
    try {
        const post = await postModel.findById(req.params.id);
        post.comments.push(data);
        await post.save();
        res.status(201).send({message:"comment created successfuly"});


    } catch (e) {
        res.status(500).send({message:"server error"});

    }
});

// update the username of all posts and comments made by the user when they update their username
postRouter.put('/posts/postedBy/update', auth, async (req, res) =>{
    try {
        const posts = await postModel.find({'postedBy.userId': req.user._id});
        posts.map(async (post) => {
            post.postedBy.username = req.body.username;
            await post.save();
        })
        const postsAgain = await postModel.find({'comments.userId': req.user._id});
        postsAgain.map(async (post) => {
            post.comments.map((comment) => comment.username = req.body.username);
            await post.save();
            res.status(200).send({message: "comment and post username are updated"});
        });
    } catch {
        res.status(500).send({message:"server error"});

    }
});


// save route will add a an object which will just be a userId 
// to the selected post (post id) in an array of all users that saved that post
postRouter.post('/posts/:id/save', auth, async(req, res) => {
    
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) {
            res.status(404).send({message: "can't save a post that doesn't exist"});
        }
        post.saves.push({savedBy: req.user.uid}); // save the current user id to saves array
        await post.save();
        res.status(200).send({message: "Save successful"});
        

    } catch (e) {
        res.status(500).send({message:"server error"});
    }
});

// remove saved post 
postRouter.post('/posts/:id/unsave', auth, async(req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) {
            res.status(404).send({message: "can't save a post that doesn't exist"});
        }
        const index = post.saves.findIndex(save => save.savedBy === req.user.uid);
        post.saves.splice(index, 1);
        await post.save();
        res.status(200).send({message: "Save successful"});
        

    } catch (e) {
        res.status(500).send({message:"server error"});
    }
});

// get all of the posts that have been saved by the user
postRouter.get('/posts/profile/savedPosts', auth, async(req, res) => {
    try {
    
        const savedPosts = await postModel.find({"saves.savedBy": req.user.uid});
        res.status(200).send({posts: savedPosts});


    } catch (e) {
        res.status(500).send({message: "server error"});
    }
});

// like post request 
postRouter.post('/posts/:id/like', auth, async(req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        post.likes += 1;
        res.status(200).send({message: "post liked"});
        await post.save();


    } catch (e) {
        res.status(500).send({message: "server error"});
    }
})
module.exports = postRouter;