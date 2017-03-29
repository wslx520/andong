'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

gulp.task('sass', function(){
    return gulp.src('./source/sass/*.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest('./css'));
    });

gulp.task('js', function(){
    return gulp.src('./source/js/*.js')
        .pipe(gulp.dest('./js')).on('error', swallowError);
    });

gulp.task('jsmin', function () {
	return gulp.src('./source/js/*.js')
        .pipe(uglify())
        .pipe(rename({
        	suffix: '.min',
        	extname: '.js'
        }))
        .pipe(gulp.dest('./js'));

});

gulp.task('copy', function () {
	return gulp.src(['./css/**/*','./images/**/*', './bootstrap/**/*', './js/**/*',
		'./data/*', './*.html'], {
		base: './'
	})
        .pipe(gulp.dest('../html201703'));

});

gulp.task('default', function(){
    gulp.watch('./source/sass/*.scss',['sass']);
    gulp.watch('./source/js/*.js',['js']);
});

gulp.task('start', ['sass', 'default'], function () {
    
})

function swallowError(error) {
    // If you want details of the error in the console
  console.error(error.toString())

  this.emit('end')
}