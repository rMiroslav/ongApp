'use strict';

var os = require('os');
var gulp = require("gulp");
var gutil = require('gulp-util');
var open = require('gulp-open');
var child_process = require("child_process");
var chalk = require('chalk');
var config = require('./config/dev');
var dbpath = 'C:/data/db';

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));


gulp.task('mongo', function(){
  child_process.exec('mongod --dbpath ' + dbpath, function(err, stdout, stderr){
    gutil.log(chalk.styles.red.open + err + chalk.styles.cyan.close);
  });
  return gutil.log(chalk.styles.green.open + "MONGODB IS RUNNING ON PORT: " + config.mongoPort + chalk.styles.green.close)
});

gulp.task('server', function(){
  child_process.exec('node server', function(err, stdout, stderr){
    gutil.log(chalk.styles.red.open + err + chalk.styles.cyan.close);
  });
  return gutil.log(chalk.styles.cyan.open + "SERVER IS RUNNING ON PORT: " + config.serverPort + chalk.styles.cyan.close);
});

gulp.task('app', function(){
  var options = {
    uri: 'localhost:8080',
    app: browser
  };
return  gulp.src('')
  .pipe(open({app: config.browser, uri: 'http://localhost:'+ config.serverPort }))
  .on('end', function(){ gutil.log(chalk.styles.yellow.open + "CHROME ON LOCALHOST: 8080" + chalk.styles.yellow.close); });
});

gulp.task('default', ['mongo', 'server', 'app']);
