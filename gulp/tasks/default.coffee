runSequence = require 'run-sequence'
gulp        = require 'gulp'
gutil       = require 'gulp-util'

gulp.task 'stylesDependences', ->
	runSequence(
		'sprite'
		'icons'
		'styles'
	)

gulp.task 'default', ->
	runSequence(
		[
			'stylesDependences'
			'templates'
			'scripts'
			'lint'
		]
		'server'
		'watch'
	)

gulp.task 'build', ['del'], ->
	gulp.start(
		'stylesDependences'
		'templates'
		'scripts'
		'copy'
	)
