//this generates dist folder for a single report
const gulp = require('gulp');
const zip = require('gulp-zip');
const webpackStream = require('webpack-stream');
const project = require('./package.json');

const del = require('del');

var currentReport = "";

if(process.argv.length < 3)
      console.log("you must enter a report name, i.e.: report-visit");

var currentReport = process.argv[2];

try{
	del([
        'build/'+currentReport
    ]).
	then( function(paths) {
    	buildDist();
    });
}
catch(err){
	console.log("can't clean folder, please check it out!",err);
}

const prependZeroIfNeeded = function (numberString) {
  return numberString.length < 2 ? '0' + numberString : numberString;
};

const generate_build_name = function (report) {
  var now = new Date();
  return project.name + '-' + report + '-' + now.getFullYear().toString() +
    prependZeroIfNeeded((now.getMonth() + 1).toString()) +
    prependZeroIfNeeded(now.getDate().toString()) + "-" +
    prependZeroIfNeeded(now.getHours().toString()) +
    prependZeroIfNeeded(now.getMinutes().toString());
};

const buildDist = function(){
	var config = require('./config/webpack.dev.single.js');
  return gulp.src([
    'src/polyfills.ts',
    'src/cordova.ts',
    'src/vendor.ts',
    'src/reports/report-'+currentReport+'/main.ts',
    'src/customization.ts',
    'src/movilizer/cordova.plugin.ts'
  ])
  .pipe(webpackStream( config ))
  .pipe(gulp.dest('build/'+currentReport));
}
