const gulp = require('gulp');

gulp.task('copy:images', () => (
  gulp.src('./src/images/**/*.{gif,jpg,jpeg,png,svg}')
    .pipe(gulp.dest('./src/temp/images/'))
));

gulp.task('copy:fonts', () => (
  gulp.src('./src/fonts/**/*.{eot,otf,ttf,woff}')
    .pipe(gulp.dest('./src/temp/fonts/'))
));
