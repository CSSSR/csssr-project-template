gulp    = require 'gulp'
stylish = require 'jshint-stylish'
jshint  = require 'gulp-jshint'

gulp.task 'jshint', ->
	return gulp.src [
			'**/*.js'
			'!libs/**/*'
		],
			cwd: 'app/scripts'
		.pipe jshint()
		.pipe jshint.reporter 'jshint-stylish'
