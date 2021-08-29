//this generates dist folder for a single report

var currentReport = "";

const generatePDF = function(report){

  var exec = require('child_process').exec;
  //var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';
  var cmd = "node ./node_modules/phantomjs-prebuilt/bin/phantomjs ./phantom-render.js"+
  " build/" + report + "/index.html "+report+".pdf";

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    if(error) console.log(stderr);
    console.log(stdout);
  });

};

if(process.argv.length < 3)
  console.log("you must enter a report name, i.e.: report-visit");
else{
  var currentReport = process.argv[2];
  generatePDF(currentReport);
}



