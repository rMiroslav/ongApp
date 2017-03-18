'use strict';

var api_key = 'key-be56bf25e2492de8506e04b3ed4d5eff';
var domain = 'sandbox9e68c501fa864b8b826987e502fe4f0e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
 
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails) 
var auth = {
  auth: {
    api_key: api_key,
    domain: domain
  }
}
 
var nodemailerMailgun = nodemailer.createTransport(mg(auth));

var activateAcount = function(req, res, next){

  nodemailerMailgun.sendMail({
  from: 'Volunteer App <postmaster@sandbox9e68c501fa864b8b826987e502fe4f0e.mailgun.org>',
  to: 'rancovmiroslav@gmail.com', // An array if you have multiple recipients. 
  // cc:'second@domain.com',
  // bcc:'secretagent@company.gov',
  subject: 'Welcome to Volunteer App!',
  // 'h:Reply-To': 'reply2this@company.com',
  //You can use "html:" to send HTML email content. It's magic! 
  // html: '<b>Wow Big powerful letters</b>',
  //You can use "text:" to send plain-text content. It's oldschool! 
  // text: 'Mailgun rocks, pow pow!'
  template:{
    name:'config/emails/activateAcount.ejs',
    engine:'ejs',
    context:{
      email: req.body.email,
      emailcode: req.body.emailcode,
      title:'Activation Email'
    }
  }
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info);
    next();
  }
});

// var data = {
//           from: 'Mail Gun TutsDaddy <postmaster@sandbox9e68c501fa864b8b826987e502fe4f0e.mailgun.org>',
//           to: req.body.email,
//           subject: 'Welcome to Volunteer App',
//         //   text: 'Hi ' + req.body.email + '. Activate your account!' 
//           html:'<article role="article"><h2>Click link below to activate your account</h2><br /><a href="http://localhost:8080/api/activate/' + req.body.email +'/' + req.body.emailcode + '">Activate Account</a></article>'
//         };

//         mailgun.messages().send(data, function (error, body) {
//           if(!error){
//             console.log(body);
//             next();

//           }else{
//             console.log(error);
//           }
//         });

}

exports.activateAcount = activateAcount;