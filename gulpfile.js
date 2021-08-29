const gulp = require('gulp');
const zip = require('gulp-zip');
const upload = require('gulp-upload');
const gutil = require('gulp-util');
const del = require('del');
const through = require('through2')

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");
const open = require('gulp-open');

const reportHtml = require('./plugins/gulp-movilizer-report-html');
const reportPDF = require('./plugins/gulp-movilizer-report-pdf');

const project = require('./package.json');
const movilizer = require('./movilizer.json');

const prependZeroIfNeeded = function (numberString) {
  return numberString.length < 2 ? '0' + numberString : numberString;
};

const generate_build_name = function (prefix) {
  var now = new Date();
  if (!prefix) {
    prefix = project.name;
  }
  return prefix + '-' + now.getFullYear().toString() +
    prependZeroIfNeeded((now.getMonth() + 1).toString()) +
    prependZeroIfNeeded(now.getDate().toString()) + "-" +
    prependZeroIfNeeded(now.getHours().toString()) +
    prependZeroIfNeeded(now.getMinutes().toString());
};

gulp.task('default', ['build']);

gulp.task('debug', ['webpack-dev-server', 'browser']);

gulp.task('clean', function () {
    return del([
        'build',
        'report',
        'dist'
    ]);
});

gulp.task('report.html', ['build.debug'], function () {
    return gulp.src('build/report-visit.html')
        .pipe(reportHtml({
            //inject:'scripts/print_brigde.js', //relative to cwd (project root)
            timeout: 20000 //miliseconds
        }))
        .pipe(gulp.dest('report/'));
});

gulp.task('report', ['report.html'], function () {
    return gulp.src('report/*.html')
        .pipe(reportPDF({usePrince:true}));
});


gulp.task('build.debug', ['clean'], function () {
  return gulp.src([
    'src/polyfills.ts',
    'src/cordova.ts',
    'src/vendor.ts',
    'src/reports/report-*/main.ts',
    'src/customization.ts'
  ])
    .pipe(webpackStream( require('./config/webpack.dev.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('build.dist', ['clean'], function () {
  return gulp.src([
    'src/polyfills.ts',
    'src/cordova.ts',
    'src/vendor.ts',
    'src/reports/report-*/main.ts',
    'src/customization.ts'
  ])
    .pipe(webpackStream( require('./config/webpack.prod.js') ))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['build.dist']);

gulp.task('dist', function () {
    return gulp.src(['build/**', '!**/*.map'])
        .pipe(zip(generate_build_name() + '.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-all', function () {
  return gulp.src('build/report-*.html')
    .pipe(through.obj(function(file, enc, cb) {
      var report = file.path.replace(file.base, "").replace(".html", "");
      gutil.log("Creating zip for: " + report);
      gulp.src(['build/assets', 'build/vendor*.*', 'build/customization*.*',
        'build/' + report + '*.*', '!**/*.map'])
        .pipe(zip(generate_build_name(report) + '.zip'))
        .pipe(gulp.dest('dist'));
      cb(null, file);
    }))
});

gulp.task('deploy', function () {
    return gulp.src(['dist/**/*.zip', 'dist/*.zip'])
        .pipe(upload({
            server: movilizer.url,
            data: {
                'systemId': movilizer.systemId,
                'password': movilizer.password,
                'pool': movilizer.pool,
                'key': movilizer.key,
                'lang': movilizer.lang,
                'suffix': movilizer.suffix
            },
            callback: function (err, data, res) {
                if (err) {
                    gutil.log(gutil.colors.red('ERROR: ' + err.toString()));
                } else {
                    gutil.log(data.toString());
                }
            }
        }));
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(require('./config/webpack.dev.js') );

  new WebpackDevServer(compiler, {
    // server and middleware options
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/report-lmra-nl.html");

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('browser', function () {
  gulp.src(__filename)
    .pipe(open({ uri: 'http://localhost:8080/report-lmra-nl.html' }));
});
