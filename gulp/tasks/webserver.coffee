gulp      = require 'gulp'
webserver = require 'gulp-webserver'
paths     = require '../paths'

gulp.task 'webserver', ->
	return gulp.src paths.dist
		.pipe webserver
			# livereload: true
			port: 3000
