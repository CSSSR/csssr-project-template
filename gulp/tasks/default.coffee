runSequence = require 'run-sequence'
gulp        = require 'gulp'

gulp.task 'build', ->
	return runSequence(
		'spritesmith'
		'imagemin'
		'stylus'
		'jade'
		'scripts'
		'copy'
	)

gulp.task 'default', ->
	return runSequence(
		'spritesmith'
		'imagemin'
		'stylus'
		'jade'
		'scripts'
		'copy'
		'jscs'
		'jshint'
		'browserSync'
		'watch'
	)
