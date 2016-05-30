var gulp = require('gulp');
var minifyCSS = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('minify-css', function() {
	return gulp.src('/Users/dragosnedelcu/Desktop/Instavets/new_web/instavets/static_files/css/*.css')
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('/Users/dragosnedelcu/Desktop/Instavets/new_web/instavets/static_files/css/'))
});

gulp.task('uglify', function() {
	return gulp.src('/Users/dragosnedelcu/Desktop/Instavets/new_web/instavets/static_files/js/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('/Users/dragosnedelcu/Desktop/Instavets/new_web/instavets/static_files/js/'))
});

gulp.task('minify', ['minify-css', 'uglify']);