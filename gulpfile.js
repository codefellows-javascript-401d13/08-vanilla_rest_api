'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('dev', () => {
  gulp.watch(['**/*.js', '!node_modules']);
});

gulp.task('default', ['lint']);
