'use strict';

var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var spawn = require('child_process').spawn;
var File = gutil.File;
var through = require('through2');

var PLUGIN_NAME = 'gulp-movilizer-report-pdf';

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function (opt) {
  opt = opt || {};
  if (!opt.jar) {
    opt.jar = 'movilizer-html2pdf-tool.jar';
  }

  var log = function (msg) {
    gutil.log('[' + PLUGIN_NAME + '] ' + msg);
  };

  var outputFileNameFromFilePath = function (file) {
    var out = 'test-return.pdf';
    var filepathSplit = file.path.split('.');

    if (filepathSplit.length > 0) {
      filepathSplit[filepathSplit.length - 1] = 'pdf';
      out = filepathSplit.join('.');
    } else {
      out = file.path + '.pdf';
    }
    return out;
  };

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

    try {
      var args, opts, child;
      if (opt.usePrince) {
        args = [file.path, '-o', outputFileNameFromFilePath(file)];
        opts = {};
        log("Spawning command: prince " + args.join(' '));
        child = spawn('prince', args, opts);
      } else {
        args = ['-jar', path.join(__dirname, opt.jar), file.path, outputFileNameFromFilePath(file)];
        opts = {};
        log("Spawning command: java " + args.join(' '));
        child = spawn('java', args, opts);
      }

      var stdout = new Buffer('');
      var stderr = new Buffer('');
      if (child.stdout) {
        child.stdout.on('data', function (buf) {
          stdout = Buffer.concat([stdout, new Buffer(buf)]);
        });
      }
      if (child.stderr) {
        child.stderr.on('data', function (buf) {
          stderr = Buffer.concat([stderr, new Buffer(buf)]);
        });
      }
      child.on('error', function (err) {
        pipeHandle.emit('error', new PluginError(PLUGIN_NAME, err));
      });

      child.on('close', function (code) {
        var stdoutStr = stdout.toString();
        var stderrStr = stderr.toString();
        if (stdoutStr) {
          log('Command output:\n' + stdoutStr);
        }
        if (stderrStr) {
          log('Command output:\n' + stderrStr);
        }
        callback(null, file);
      });
    } catch (e) {
      log('ERROR: ' + e);
      callback(null, file);
    }
  });
};
