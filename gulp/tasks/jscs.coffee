gulp = require 'gulp'
jscs = require 'gulp-jscs'

gulp.task 'jscs', ->
	return gulp.src [
			'**/*.js'
			'!libs/**/*'
		],
			cwd: 'app/scripts'
		.pipe jscs()
