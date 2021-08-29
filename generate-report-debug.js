//this generates a single report
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");

const open = require('gulp-open');
const gutil = require('gulp-util');

var config = require('./config/webpack.dev.single.js');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {});
server.listen(8080, function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
});
