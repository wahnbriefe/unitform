
//----------------------------------------------------
//		Setup
//----------------------------------------------------

// require plug ins

var gulp 	= require('gulp'),
	less 	= require('gulp-less'),
	watch 	= require('gulp-watch'),
	uglify 	= require('gulp-uglify');


//----------------------------------------------------
//		Tasks
//----------------------------------------------------


// LESS

gulp.task('less', function ()
{
	gulp.src('*.less')
		.pipe( less({ compress: false }) )
		.pipe( gulp.dest('dist') );
});


// JS

gulp.task('js', function()
{
	gulp.src('unitform.js')
		.pipe( uglify() )
		.pipe( gulp.dest('dist') );
});


// Watch files

gulp.task('watch', function()
{
	gulp.watch('*.js', ['js']);
});


//----------------------------------------------------
//		Group Tasks
//----------------------------------------------------

gulp.task('default', ['less', 'js']);
