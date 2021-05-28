var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require("path");
const postRouter = require('./PostRouter');
require("dotenv").config();


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(postRouter);
app.use(express.static(path.join(__dirname,'Client','build')));

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "Client","build","index.html"));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("app is listening on port " + port);
})