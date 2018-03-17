const gulp = require('gulp');
const del = require('del');

gulp.task('clean:temp', () => del.sync(['!./src/temp/images/**/*', '!./src/temp/fonts/**/*', '!./src/temp/video/**/*']));
gulp.task('clean:dist', () => del.sync('./dist'));
