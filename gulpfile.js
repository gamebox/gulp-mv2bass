var gulp = require('gulp');
var mv2bass = require('./gulp-mv2bass.js');

var rules = {
  'body': 'mt5',
  'byline': 'blue mx2 center'
};

gulp.task('mv2bass', function() {
  gulp.src('./src/**/*.html')
  .pipe(mv2bass(rules))
  .pipe(gulp.dest('dist'));
});
