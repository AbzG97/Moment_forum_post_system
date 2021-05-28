var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const postRouter = require('./PostRouter');
require("dotenv").config();


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(postRouter);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('Client/build/'));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));

  });
}



app.listen(process.env.PORT || 3001, () => {
  console.log("app is listening on port 3001");
})
