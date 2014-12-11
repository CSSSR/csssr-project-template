gulp    = require 'gulp'
changed = require 'gulp-changed'
paths   = require '../paths'

gulp.task 'copy:resources', ->
	return gulp.src 'app/resources/**/*'
		.pipe changed paths.dist
		.pipe gulp.dest paths.dist

gulp.task 'copy', ['copy:resources']
