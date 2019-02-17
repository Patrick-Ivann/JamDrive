var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify')

gulp.task('debug', function () {
    return gulp.src('./build/static/js/**/.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./build/static/js'));
});

gulp.task('scripts',function () {
    return gulp.src('./build/static/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/static/js'))
})