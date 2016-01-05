var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var $ = require('gulp-load-plugins')();
var config = require('./webpack.config.js');
var configProduction = require('./webpack.production.config.js');

// Build app for development
gulp.task('webpack:development', ['clean'], function(callback) {
  // run webpack
  webpack(config, function(err, stats) {
    if (err) { throw new $.util.PluginError('Webpack Error:', err); }
    gutil.log('[webpack]', stats.toString({colors: true}));
    callback();
  });
});

// Build app for production
gulp.task('webpack:production', ['clean'], function(callback) {
  // run webpack
  webpack(configProduction, function(err, stats) {
    if (err) { throw new $.util.PluginError('Webpack Error:', err); }
    gutil.log('[webpack]', stats.toString({colors: true}));
    callback();
  });
});

// Copy server files
gulp.task('copy:server', ['clean'], function() {
  gulp.src([
    'server/**',
  ]).pipe(gulp.dest('dist/server'));
});

// Copy package.json
gulp.task('copy:package-json', ['clean'], function() {
  gulp.src([
    'package.json',
  ]).pipe(gulp.dest('dist/'));
});

// Clean server folder
gulp.task('clean', function() {
  return del(['dist/**']);
});

gulp.task('build', [
  'copy:server',
  'copy:package-json',
  'webpack:production',
]);

gulp.task('build:development', [
  'copy:server',
  'copy:package-json',
  'webpack:production',
]);
