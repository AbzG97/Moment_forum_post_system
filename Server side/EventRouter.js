const express = require('express');
const mongoose = require("mongoose");
const eventModel = require('./EventModel');
const auth = require('./backendAuth');
const eventRouter = express.Router();

// make db connection
mongoose.connect('mongodb://localhost:27017/moments-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});




// get all events from database
eventRouter.get('/events',auth,  async (req, res) => {
    // console.log(req.user.uid);
    try {
        const events = await eventModel.find({});
        if(events.length === 0){
            res.status(200).send({message: 'empty database'}) 
        } else {
            res.status(200).send({events: events});
        }
        

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
})

// get a single post from database
eventRouter.get('/events/:id',auth,  async (req, res) => {
    // console.log(req.user.uid);
    try {
        const post = await eventModel.findById(req.params.id);
        if(post.length === 0){
            res.status(200).send({message: 'empty database'}) 
        } else {
            res.status(200).send({post: post});
        }
        

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
})

// create new event
eventRouter.post('/event', auth, async (req, res) => {
    // console.log(req.body);
    // console.log(req.user.uid);
    const eventData = {
        title: req.body.title,
        description: req.body.description,
        picture: req.body.picture,
        category: req.body.category,
        postedBy: req.user.uid
    }


    const newEvent = new eventModel({
        title: eventData.title,
        description: eventData.description,
        picture: eventData.picture,
        category: eventData.category,
        postedBy: eventData.postedBy
    });
    console.log(newEvent);

    try {
        await newEvent.save();
        res.status(201).send({message: "new event created", event: newEvent});

    } catch (e){
        res.status(500).send({message: 'server error'});
    }
});

// get all the postsed that that were made by the logged in and authenticated user
eventRouter.get('/user/profile/myEvents', auth, async(req, res) => {
    console.log(req.user.uid);
    try {
        const posts = await eventModel.find({postedBy: req.user.uid}); // find using the authenticated user id
        if(posts.length === 0 ){
            res.status(204).send({message: "you have not posted any events"});
        }  else {
            res.status(200).send({posts: posts});
        }

    } catch (e) {
        res.status(500).send({message: "server error"});
    }

})

// delete an event of the authenticated user using their id
eventRouter.post('/event/delete', auth, async (req, res) => {
   try {
       const event = await eventModel.findByIdAndDelete(req.query.id);
       console.log(event);
       if(!event) {
           res.status(404).send({message: "can't delete an event that doesn't exist"});
       } else {
           res.status(200).send({message: "event deleted"});
       }

   } catch (e) {
       res.status(500).send({message: 'server error'});
   }
});

// update an event using id
eventRouter.post('/event/update', auth, async (req, res) => {

    const incoming_updates = Object.keys(req.body);
    const expected_updates = ["title","venue","address","category", "date"];
    const validUpdate = incoming_updates.every((update) => expected_updates.includes(update));

    if(validUpdate){
        try {
            const event = await eventModel.findByIdAndUpdate(req.query.id, req.body);
            if(!event){
                res.status(404).send({message: "cant' update an event that doesn't exist"});
            } else {
                await event.save();
                res.status(200).send({message: "event data updated"});

            }
        } catch (e){
            res.status(500).send({message: "server error"});
        }

    } else {
        res.status(500).send({message: "invalid updates"});
    }
});

// add a likeBy object which gets the user of who liked this post
eventRouter.post('/event/like/:id', auth, async (req,res) => {
    console.log(req.params.id);
    console.log(req.body.likes);
    try {
        const post = await eventModel.findById(req.params.id);
        post.likedBy.push(req.user.uid);
        await post.save();


    } catch (e) {

    }
});

// add comment to the post
eventRouter.post('/event/comment/:id', auth, async (req,res) => {
    const data = { 
        commentDesc: req.body.comment,
        commentBy: req.user.uid
    }
    try {
        const post = await eventModel.findById(req.params.id);
        post.comments.push(data);
        await post.save();


    } catch (e) {

    }
    console.log(data);
    console.log(req.params.id);
});

module.exports = eventRouter;