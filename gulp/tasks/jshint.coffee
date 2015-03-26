gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
stylish      = require 'jshint-stylish'
jshint       = require 'gulp-jshint'
errorHandler = require '../utils/errorHandler'

gulp.task 'jshint', ->
	gulp.src [
			'**/*.js'
			'!libs/**/*'
		],
			cwd: 'app/scripts'
		.pipe plumber errorHandler: errorHandler
		.pipe jshint()
		.pipe jshint.reporter 'jshint-stylish'
