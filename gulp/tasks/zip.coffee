gulp  = require 'gulp'
zip   = require 'gulp-zip'
paths = require '../paths'

gulp.task 'zip', ->
	gulp.src 'dist/**/*'
		.pipe zip 'dist.zip'
		.pipe gulp.dest paths.dist
