'use strict';

var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var through = require('through2');
var phantomjs = require('phantomjs-prebuilt');

var PLUGIN_NAME = 'gulp-movilizer-report-html';

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function (opt) {

  opt = opt || {};

  var log = function (msg) {
    gutil.log('[' + PLUGIN_NAME + '] ' + msg);
  };

  var outputFileNameFromFilePath = function (file) {
    var out = 'test-return.html';
    var filepathSplit = file.path.split('.');

    if (filepathSplit.length > 1) {
      filepathSplit[filepathSplit.length - 2] = filepathSplit[filepathSplit.length - 2] + '-return';
      out = filepathSplit.join('.');
    } else {
      out = file.path + '-return';
    }
    return out;
  };

  var phantomjs = require('./lib/phantomjs').init();
  var errorCount = 0;

  return through.obj(function (file, encoding, callback) {
    var pipeHandle = this;
    if (!file || typeof file === 'string' || file.isNull()) {
      // nothing to do
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

      // or, if you can handle Streams:
      //file.contents = file.contents.pipe(...
      //return callback(null, file);
    } else if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      // this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));

      // We just need the path

      // or, if you can handle Buffers:
      //file.contents = ...
      //return callback(null, file);
    }

    // Handle any number of namespaced events like so.

    phantomjs.on('generate_form.error', function (msg) {
      errorCount++;
      log('ERROR: ' + msg);
      this.emit('error', new PluginError(PLUGIN_NAME, 'Test error'));
    });

    // Create some kind of "all done" event.
    phantomjs.on('generate_form.done', function (returnValue) {
      phantomjs.halt();
      log('DEBUG: Task completed successfully');
      var outputFile = new File({
        cwd: file.cwd,
        base: file.base,
        path: outputFileNameFromFilePath(file),
        contents: new Buffer(returnValue)
      });
      callback(null, outputFile);
    });

    // Built-in error handlers.
    phantomjs.on('console', function (msg) {
      log('console - ' + msg);
    });

    phantomjs.on('fail.load', function (url) {
      phantomjs.halt();
      pipeHandle.emit('error', new PluginError(PLUGIN_NAME, 'PhantomJS unable to load URL.'));
    });

    phantomjs.on('fail.timeout', function () {
      phantomjs.halt();
      pipeHandle.emit('error', new PluginError(PLUGIN_NAME, 'PhantomJS timed out.'));
    });

    // Spawn phantomjs
    if (opt.inject) {
      opt.inject = file.cwd.replace(/\\/g, '/') + '/' + opt.inject;
    }
    phantomjs.spawn('file:///' + file.path.replace(/\\/g, '/'), {
      // Additional PhantomJS options.
      options: opt,
      // Complete the task when done.
      done: function (err) {
        log('Closing Phantomsjs after opening web: ' + file.path);
        // pipeHandle.emit('error', new PluginError(PLUGIN_NAME, 'PhantomJS didn\'t finish the task assigned in the webpage.'));
        // done(err || errorCount === 0);
      }
    });

  });
};
