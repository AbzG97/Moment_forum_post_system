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


app.listen(3001, () => {
  console.log("app is listening on port 3001");
})
