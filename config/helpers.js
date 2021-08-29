var fs = require('fs');
var path = require('path');

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function reportsPath() {
  return path.join(root('src') ,'reports');
}

function getReportDirectories() {
  var srcPath = reportsPath();
  return fs.readdirSync(srcPath).filter(function(file) {
    return fs.statSync(path.join(srcPath, file)).isDirectory() &&
      fs.statSync(path.join(srcPath, file));
  });
}

function createReportsEntries(mergeExistingEntriesObject) {
  var reports = reportsPath();
  var reportsDirs = getReportDirectories();
  for (var i = 0; i < reportsDirs.length; i++) {
    if (reportsDirs[i].match(/report-\w*/gi)) {
      mergeExistingEntriesObject[reportsDirs[i]] = path.join(reports, reportsDirs[i], 'main.ts');
    }
  }
  return mergeExistingEntriesObject;
}

function createSingleReportEntries(report, mergeExistingEntriesObject) {
  var reports = reportsPath();
  mergeExistingEntriesObject[report] = path.join(reports, report, 'main.ts');
  return mergeExistingEntriesObject;
}

function createReportsChunks(mergeExistingChunksArray) {
  mergeExistingChunksArray = mergeExistingChunksArray || [];
  var reports = reportsPath();
  var reportsDirs = getReportDirectories();
  for (var i = 0; i < reportsDirs.length; i++) {
    if (reportsDirs[i].match(/report-\w*/gi)) {
      mergeExistingChunksArray.push(reportsDirs[i]);
    }
  }
  return mergeExistingChunksArray;
}

function createSingleReportChunks(report, mergeExistingChunksArray) {
  mergeExistingChunksArray = mergeExistingChunksArray || [];
  var reports = reportsPath();
  mergeExistingChunksArray.push( path.join(reports, report) );
  return mergeExistingChunksArray;
}

exports.root = root;
exports.reportsPath = reportsPath;
exports.getReportDirectories = getReportDirectories;
exports.createReportsEntries = createReportsEntries;
exports.createReportsChunks = createReportsChunks;
exports.createSingleReportEntries = createSingleReportEntries;
exports.createSingleReportChunks = createSingleReportChunks;