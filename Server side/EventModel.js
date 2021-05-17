const mongoose = require("mongoose");


// make db connection
mongoose.connect('mongodb://localhost:27017/moments-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// creating the events schema and model

const eventSchema = new mongoose.Schema({
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
    // date: {
    //     type: Date,
    //     required: false
    // },
    picture: {
        type: String,
        required: false
    },
    likedBy: [{
        type: String,
        required: false
    }],
    savedBy: {
        type: String,
        required: false
    },
    postedBy: {
        type: String,
        required: true
    }
});

const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;


