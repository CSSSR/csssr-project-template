gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
eslint       = require 'gulp-eslint'
errorHandler = require '../utils/errorHandler'

gulp.task 'eslint', ->
	gulp.src [
			'**/*.js'
			'!libs/**/*'
		],
			cwd: 'scripts'
		.pipe plumber errorHandler: errorHandler
		.pipe eslint()
		.pipe eslint.format()
