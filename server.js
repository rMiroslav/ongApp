'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("./config/main");
var expressJwt = require("express-jwt");
var path = require("path");
var engine = require('ejs-locals');
var app = express();

//set view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
//
//
// app.set('views', path.join(__dirname, '/public'));
//serve static

app.use(express.static(path.join(__dirname+'/public')));

//Use bodyParser to make POST requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

//Log requests to console
app.use(morgan('dev'));

//initialize passport
app.use(passport.initialize());

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// unprotected routes
app.use(expressJwt({ secret: config.secret}).unless({path: [
  '/api/login', 
  '/api/register', 
  '/api/guest',
   /^\/api\/activate\/.*/, 
    '/home',
     '/about'
     ]}));

//handle error if not token
app.use(function (err, req, res, next) {
  // console.log(JSON.stringify(req.headers));
  if (err.name === 'UnauthorizedError') {
    var filePath = "./public/index.html"
     var resolvedPath = path.resolve(filePath);
    //  console.log(resolvedPath);
    //  res.sendFile(resolvedPath);
    // res.status(401).send('invalid token...');
    res.redirect('http://localhost:8080/#!/login');
  }
  // next();
});

app.use('/api', require('./app/routes/auth'));
app.use('/', require('./app/routes/events'));

//listen
app.listen(config.port, function(){
  console.log("Running on port @=> " + config.port);
});
