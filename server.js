var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("./config/main");
// var User = require('./app/models/user');
// var promise = require('mpromise');
var app = express();


//Use bodyParser to make POST requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Log requests to console
app.use(morgan('dev'));

//initialize passport
app.use(passport.initialize());

//connect to db

mongoose.connect(config.database);

//add pasport Strategy

// require('./config/passport')(passport);

app.use('/api', require('./app/routes/routes'));


app.listen(config.port, function(){
  console.log("Running on port @=> " + config.port);
});
