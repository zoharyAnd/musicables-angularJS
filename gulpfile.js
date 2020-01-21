var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('app/assets/scss/theme.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
});

gulp.task('js', function() {
    gulp.src('assets/js/*.js')
    .pipe(concat())
    .pipe(gulp.dest('theme.js'))
});