'use strict';

exports.init = function () {
  var PLUGIN_NAME = 'gulp-lib-phantomjs';

  // Nodejs libs.
  var path = require('path');
  var fs = require('fs');
  var spawn = require('child_process').spawn;

  // Gulp libs.
  var gutil = require('gulp-util');

  // External libs.
  var semver = require('semver');
  var Tempfile = require('temporary').File;
  var EventEmitter2 = require('eventemitter2').EventEmitter2;
  var rimraf = require('rimraf');
  var _ = require('lodash');
  var which = require('which').sync;

  // Get path to phantomjs binary
  var binPath = require('phantomjs-prebuilt').path;

  // The module to be exported is an event emitter.
  var exports = new EventEmitter2({wildcard: true, maxListeners: 0});

  // Get an asset file, local to the root of the project.
  var asset = path.join.bind(null, __dirname, '..');

  // Call this when everything has finished successfully... or when something
  // horrible happens, and you need to clean up and abort.
  var halted;
  exports.halt = function () {
    halted = true;
  };

  var log = function (msg) {
    gutil.log('[' + PLUGIN_NAME + '] ' + msg);
  };

  // Start PhantomJS process.
  exports.spawn = function (pageUrl, options) {
    // Create temporary file to be used for grunt-phantom communication.
    var tempfile = new Tempfile();
    // Timeout ID.
    var id;
    // The number of tempfile lines already read.
    var n = 0;
    // Reset halted flag.
    halted = null;
    // Handle for spawned process.
    var phantomJSHandle;

    // Default options.
    options.options = options.options || {};
    if (typeof options.killTimeout !== 'number') {
      options.killTimeout = 5000;
    }

    // All done? Clean up!
    var cleanup = function (done, immediate) {
      clearTimeout(id);
      var kill = function () {
        // Only kill process if it has a pid, otherwise an error would be thrown.
        if (phantomJSHandle.pid) {
          phantomJSHandle.kill();
        }
        rimraf(tempfile.path, function (err) {
          if (err) {
            throw err;
          }
        });
        if (typeof done === 'function') {
          done(null);
        }
      };
      // Allow immediate killing in an error condition.
      if (immediate) {
        return kill();
      }
      // Wait until the timeout expires to kill the process, so it can clean up.
      setTimeout(kill, options.killTimeout);
    };

    // Internal methods.
    var privates = {
      // Abort if PhantomJS version isn't adequate.
      version: function (version) {
        var current = [version.major, version.minor, version.patch].join('.');
        var required = '>= 1.6.0';
        if (!semver.satisfies(current, required)) {
          exports.halt();
          log('ERROR: ', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
          log(
            'In order for this task to work properly, PhantomJS version ' +
            required + ' must be installed, but version ' + current +
            ' was detected.'
          );
          log('The correct version of PhantomJS needs to be installed.', 127);
        }
      }
    };

    var read = function (filepath) {
      var contents;
      try {
        contents = fs.readFileSync(String(filepath), 'utf-8');
        return contents;
      } catch (e) {
        throw new PluginError(PLUGIN_NAME, 'Unable to read "' + filepath + '" file (Error code: ' + e.code + ').');
      }
    };

    // from grunt.util.spawn
    var spawn_child = function (opts, done) {
      // Build a result object and pass it (among other things) into the
      // done function.
      var callDone = function (code, stdout, stderr) {
        // Remove trailing whitespace (newline)
        stdout = _.trimEnd(stdout);
        stderr = _.trimEnd(stderr);
        // Create the result object.
        var result = {
          stdout: stdout,
          stderr: stderr,
          code: code,
          toString: function () {
            if (code === 0) {
              return stdout;
            } else if ('fallback' in opts) {
              return opts.fallback;
            } else if (opts.grunt) {
              // grunt.log.error uses standard out, to be fixed in 0.5.
              return stderr || stdout;
            }
            return stderr;
          }
        };
        // On error (and no fallback) pass an error object, otherwise pass null.
        done(code === 0 || 'fallback' in opts ? null : new Error(stderr), result, code);
      };

      var cmd, args;
      var pathSeparatorRe = /[\\\/]/g;

      try {
        if (!pathSeparatorRe.test(opts.cmd)) {
          // Only use which if cmd has no path component.
          cmd = which(opts.cmd);
        } else {
          cmd = opts.cmd.replace(pathSeparatorRe, path.sep);
        }
      } catch (err) {
        callDone(127, '', String(err));
        return;
      }
      args = opts.args || [];

      var child = spawn(cmd, args, opts.opts);
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
      child.on('close', function (code) {
        callDone(code, stdout.toString(), stderr.toString());
      });
      return child;
    };

    // It's simple. As the page running in PhantomJS alerts messages, they
    // are written as JSON to a temporary file. This polling loop checks that
    // file for new lines, and for each one parses its JSON and emits the
    // corresponding event with the specified arguments.
    (function loopy() {
      // Read the file, splitting lines on \n, and removing a trailing line.
      var lines = read(tempfile.path).split('\n').slice(0, -1);
      // Iterate over all lines that haven't already been processed.
      var done = lines.slice(n).some(function (line) {
        // Get args and method.
        var args = JSON.parse(line);
        var eventName = args[0];
        // Debugging messages.
        // log('DEBUG: ' + JSON.stringify(['phantomjs'].concat(args)));
        if (eventName === 'private') {
          // If a private (internal) message is passed, execute the
          // corresponding method.
          privates[args[1]].apply(null, args.slice(2));
        } else {
          // Otherwise, emit the event with its arguments.
          exports.emit.apply(exports, args);
        }
        // If halted, return true. Because the Array#some method was used,
        // this not only sets "done" to true, but stops further iteration
        // from occurring.
        return halted;
      });

      if (done) {
        // All done.
        cleanup(options.done);
      } else {
        // Update n so previously processed lines are ignored.
        n = lines.length;
        // Check back in a little bit.
        id = setTimeout(loopy, 100);
      }
    }());

    // Process options.
    var failCode = options.failCode || 0;

    // An array of optional PhantomJS --args.
    var args = [];
    // Additional options for the PhantomJS main.js script.
    var opts = {};

    // Build args array / opts object.
    Object.keys(options.options).forEach(function (key) {
      if (/^\-\-/.test(key)) {
        args.push(key + '=' + options.options[key]);
      } else {
        opts[key] = options.options[key];
      }
    });

    // Keep -- PhantomJS args first, followed by grunt-specific args.
    args.push(
      // The main PhantomJS script file.
      opts.phantomScript || asset('phantomjs/main.js'),
      // The temporary file used for communications.
      tempfile.path,
      // URL or path to the page .html test file to run.
      pageUrl,
      // Additional PhantomJS options.
      JSON.stringify(opts)
    );

    log('DEBUG: child_process args - ' + JSON.stringify(args));

    // Actually spawn PhantomJS.
    return phantomJSHandle = spawn_child({
      cmd: binPath,
      args: args
    }, function (err, result, code) {
      if (!err) {
        return;
      }

      // Ignore intentional cleanup.
      if (code === 15 || code === null /* SIGTERM */) {
        return;
      }

      // If we're here, something went horribly wrong.
      cleanup(null, true /* immediate */);
      // grunt.verbose.or.writeln();
      log('PhantomJS threw an error:').error();
      // Print result to stderr because sometimes the 127 code means that a shared library is missing
      String(result).split('\n').forEach('error', log);
      if (code === 127) {
        log(
          'In order for this task to work properly, PhantomJS must be installed locally via NPM. ' +
          'If you\'re seeing this message, generally that means the NPM install has failed. ' +
          'Please submit an issue providing as much detail as possible at: ' +
          'https://github.com/Movilizer/gulp-movilizer-report-html/issues'
        );
        log('PhantomJS not found.' + ' ERROR_CODE:' + failCode);
      } else {
        log('PhantomJS exited unexpectedly with exit code ' + code + '.' + ' ERROR_CODE:' + failCode);
      }
      options.done(code);
    });
  };

  return exports;
};
