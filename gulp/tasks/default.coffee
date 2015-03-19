runSequence = require 'run-sequence'
gulp        = require 'gulp'

gulp.task 'build', ->
	return runSequence(
		'del'
		'spritesmith'
		'svg'
		'imagemin'
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
		'imagemin'
		'svg'
		'stylus'
		'jade'
		'scripts'
		'copy'
		'jscs'
		'jshint'
		'browserSync'
		'watch'
	)
