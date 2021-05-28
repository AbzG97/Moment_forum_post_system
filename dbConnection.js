const mongoose = require("mongoose");
require("dotenv").config();

// make db connection
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
});

module.exports = mongoose;
