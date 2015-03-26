gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
jscs         = require 'gulp-jscs'
errorHandler = require '../utils/errorHandler'

gulp.task 'jscs', ->
	gulp.src [
			'**/*.js'
			'!libs/**/*'
		],
			cwd: 'app/scripts'
		.pipe plumber errorHandler: errorHandler
		.pipe jscs()
