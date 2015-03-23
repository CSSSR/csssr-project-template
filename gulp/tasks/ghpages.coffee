gulp    = require 'gulp'
ghpages = require 'gulp-gh-pages'

gulp.task 'ghpages', ->
	return gulp.src 'dist/**/*'
		.pipe ghpages branch: 'dist'
