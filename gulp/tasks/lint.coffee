gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
eslint       = require 'gulp-eslint'
errorHandler = require '../utils/errorHandler'

gulp.task 'lint', ->
	gulp.src [
			'**/*.js'
		],
			cwd: 'app'
		.pipe plumber errorHandler: errorHandler
		.pipe eslint()
		.pipe eslint.format()
