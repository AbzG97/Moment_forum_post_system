var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const checkAuth = require('./backendAuth');
const eventRouter = require('./EventRouter');
require("dotenv");


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authtoken" 
  );
  next();
});
app.use(eventRouter);




app.get('/', checkAuth, (req, res) => {
  res.json({
    message: 'Hello World!'
  })
})

app.post('/post', checkAuth, (req, res) => {
  console.log(req.body);
})

app.get('/test', (req, res) => {
  res.json({
    message: 'test api route works'
  })
})

app.listen(3001, () => {
  console.log("app is listening on port 3001");
})
