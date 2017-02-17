var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("./config/main");
var expressJwt = require("express-jwt");
var app = express();


//Use bodyParser to make POST requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Log requests to console
app.use(morgan('dev'));

//initialize passport
app.use(passport.initialize());

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// unprotected routes
app.use(expressJwt({ secret: config.secret}).unless({path: ['/api/login', '/api/register', '/api/guest']}));

//handle error if not token
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.use('/api', require('./app/routes/routes'));

//listen
app.listen(config.port, function(){
  console.log("Running on port @=> " + config.port);
});
