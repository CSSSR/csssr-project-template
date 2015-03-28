gulp    = require 'gulp'
ghpages = require 'gulp-gh-pages'

gulp.task 'ghpages', ->
	gulp.src 'dist/**/*'
		.pipe ghpages branch: 'dist'
