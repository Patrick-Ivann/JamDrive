var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify')

// gulp.task('debug', function () {
//     return gulp.src('./build/static/js/**/.js')
//         .pipe(stripDebug())
//         .pipe(gulp.dest('./build/static/js'));
// });


gulp.task('debug', function () {
    return gulp.src(['./src/**/.js', './src/**/.jsx', '!./node_modules/**'])
        .pipe(stripDebug())
        .pipe(gulp.dest('./src'));
});
// gulp.task('scripts',function () {
//     return gulp.src(['./build/static/js/**/*.js', '!./build/static/js/**/*chunk.js.map','!./build/static/js/**/*chunk.js', '!./build/static/js/**/*.js.map'])
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/static/js'))
// })


gulp.task('scripts',function () {
    return gulp.src(['./src/**/.js', './src/**/.jsx', '!./node_modules/**'])
    .pipe(uglify())
    .pipe(gulp.dest('./src'))
})

