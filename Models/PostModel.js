require("../dbConnection");
const mongoose = require("mongoose");
// creating the events schema and model

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: false,
        trim: true
    },
    description: {
        type: String,
        require: false
    },
    category: {
        type: String,
        required: false
    },
    comments: [{
        userId: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        commentDesc: {
            type: String,
            required: false
        }
    }],
    postedBy: {
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    saves:[
            {
            savedBy: {
                type: String // user id 
            }
        }
    ],
    likes: Number,
    date : {
        type: Date,
        required: true
    }
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;


