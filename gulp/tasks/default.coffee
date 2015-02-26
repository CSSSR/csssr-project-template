runSequence = require 'run-sequence'
gulp        = require 'gulp'

gulp.task 'build', ->
	return runSequence(
		'del'
		'spritesmith'
		'svg'
		'stylus'
		'jade'
		'scripts'
		'copy'
	)

gulp.task 'deploy', ->
	return runSequence(
		'del'
		'build'
		'ghpages'
	)

gulp.task 'default', ->
	return runSequence(
		'spritesmith'
		'svg'
		'stylus'
		'jade'
		'scripts'
		'jscs'
		'jshint'
		'browserSync'
		'watch'
	)
