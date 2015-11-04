import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const DEBUG = false;

gulp.task('build', function() {
  let src = browserify({
    entries: ["./src/client.js"],
    debug: DEBUG
  }).transform(babelify).bundle();
  return src
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${__dirname}/public`));
});
