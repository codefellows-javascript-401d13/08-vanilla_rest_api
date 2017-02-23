'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  gulp.src(['**/*-test.js', '!node_modules/**'])
  .pipe(mocha());
});

gulp.task('dev', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint', 'mocha']);
});

gulp.task('default', ['lint', 'mocha']);
