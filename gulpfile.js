'use strict';

const gulp             = require('gulp');
const plumber          = require('gulp-plumber');
const sass             = require('gulp-sass')(require('node-sass'));
const sassGlob         = require('gulp-sass-glob');
const sourcemaps       = require("gulp-sourcemaps");
const stripCssComments = require('gulp-strip-css-comments');
const notify           = require("gulp-notify");
const autoprefixer     = require('gulp-autoprefixer');
const browserSync      = require('browser-sync').create();
const concat           = require('gulp-concat');
const twig             = require('gulp-twig');

/* Main SASS task */
gulp.task('sass', function () {
  return gulp.src([
    './src/sass/**/*.s*ss'
  ])
    .pipe(plumber(({
      errorHandler: notify.onError('SASS error: <%= error.message %>')
    })))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }))
    .pipe(sass.sync())
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'));
});

/* Task for Js concat */
gulp.task('js', function() {
  return gulp.src([
    './src/js/**/*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

/* Task for Twig */
gulp.task('twig', function () {
  return gulp.src('./src/twig/index.twig')
    .pipe(twig())
    .pipe(gulp.dest('./dist'));
});

/* Fonts */
gulp.task('fonts', function () {
  return  gulp.src('./fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

/* Task for watch */
gulp.task('default', function() {
  gulp.series('sass', 'js', 'twig', 'fonts')();
  browserSync.init({
    server: './dist'
  });

  gulp.watch('dist/*').on('change', browserSync.reload)
  gulp.watch('./src/twig/**/*.twig', gulp.series('twig'));
  gulp.watch('./src/sass/**/*.s*ss', gulp.series('sass'));
  gulp.watch('./src/js/main.js', gulp.series('js'));
  return;
});
