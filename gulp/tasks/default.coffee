runSequence = require 'run-sequence'
gulp        = require 'gulp'
gutil       = require 'gulp-util'

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
			'lint'
		]
		'browserSync'
		'watch'
	)

gulp.task 'build', ['del'], ->
	gulp.start(
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
