gulp    = require 'gulp'
ghpages = require 'gulp-gh-pages'

gulp.task 'deploy', ->
	runSequence(
		'del'
		'build'
		->
			gulp.src 'dist/**/*'
				.pipe ghpages branch: 'dist'
	)
