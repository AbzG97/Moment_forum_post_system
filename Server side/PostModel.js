const mongoose = require("mongoose");


// make db connection
mongoose.connect('mongodb://localhost:27017/moments-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});

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
        commentBy: {
            type:String,
            required: false
        },
        commentDesc: {
            type: String,
            required: false
        }
    }],
    postedBy: {
        type: String,
        required: true
    }
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;

