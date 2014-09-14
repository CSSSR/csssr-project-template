gulp       = require 'gulp'
livereload = require 'gulp-livereload'

gulp.task 'livereload', ['watch'], ->
	livereload.listen()

	setTimeout(
		->
			livereload.changed()
			gulp.watch 'dist/**/*', livereload.changed
		2000
	)
