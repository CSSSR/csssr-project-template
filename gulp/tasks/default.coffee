runSequence = require 'run-sequence'
gulp        = require 'gulp'

gulp.task 'stylusDependences', ->
	runSequence(
		'spritesmith'
		'svg'
		'stylus'
	)

gulp.task 'default', ->
	runSequence(
		[
			'stylusDependences'
			'jade'
			'scripts'
			'jscs'
			'jshint'
		]
		'browserSync'
		'watch'
	)

gulp.task 'build', ['del'], ->
	gulp.run(
		'stylusDependences'
		'jade'
		'scripts'
		'copy'
	)

gulp.task 'deploy', ->
	runSequence(
		'del'
		'build'
		'ghpages'
	)
