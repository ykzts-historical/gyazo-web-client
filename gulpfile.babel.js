import { env } from 'process';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const DEBUG = env.NODE_ENV !== 'production';

gulp.task('build', ['build:script']);

gulp.task('build:script', function() {
  let src = browserify({
    entries: ["./src/client.js"],
    debug: DEBUG
  }).transform(babelify).bundle();
  return src
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${__dirname}/public`));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./config/routes.js', ['build:script']);
  gulp.watch('./src/**/*.js', ['build:script']);
});
