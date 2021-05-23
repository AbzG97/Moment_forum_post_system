const express = require('express');
const mongoose = require("mongoose");
const postModel = require('./PostModel');
const auth = require('./backendAuth');
const postRouter = express.Router();

// make db connection
mongoose.connect('mongodb://localhost:27017/moments-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});




// get all posts from database
postRouter.get('/posts', async (req, res) => {
    // console.log(req.user.uid);
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
postRouter.get('/posts/:id',auth,  async (req, res) => {
    // console.log(req.user.uid);
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
    // console.log(req.user);
    const postsData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        "postedBy.userId": req.user.uid,
        "postedBy.username": req.user.displayName

    }


    const newposts = new postModel(postsData);

    try {
        await newposts.save();
        res.status(201).send({message: "new posts created", posts: newposts});

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
});

// get all the postsed that that were made by the logged in and authenticated user
postRouter.get('/user/profile/myPosts', auth, async(req, res) => {
    console.log(req.user.uid);
    try {
        const posts = await postModel.find({"postedBy.userId": req.user.uid}); // find using the authenticated user id
        if(posts.length === 0 ){
            res.status(204).send({message: "you have not posted any posts"});
        }  else {
            res.status(200).send({posts: posts});
        }

    } catch (e) {
        res.status(500).send({message: "server error"});
    }

})

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
        "commentBy.userId": req.user.uid,
        "commentBy.username": req.user.displayName
    }
    try {
        const post = await postModel.findById(req.params.id);
        post.comments.push(data);
        await post.save();


    } catch (e) {

    }
    console.log(data);
    console.log(req.params.id);
});

// update the username of all posts and comments made by the user when they update their username
postRouter.put('/posts/postedBy/update', auth, async (req, res) =>{
    try {
        const posts = await postModel.find({'postedBy.userId': req.user.uid});
        posts.map(async (post) => {
            post.postedBy.username = req.body.username;
            await post.save();
        })
        const postsAgain = await postModel.find({'comments.commentBy.userId': req.user.uid});
        postsAgain.map(async (post) => {
            post.comments.map((comment) => {
                comment.commentBy.username = req.body.username;
            });
            await post.save()
        })

      
    } catch {

    }
})
module.exports = postRouter;