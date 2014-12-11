browserSync = require 'browser-sync'
gulp        = require 'gulp'

gulp.task 'browserSync', ['watch'], ->
	setTimeout(
		->
			browserSync
				files: ['dist/**/*']
				open: false
				port: 3001
				server:
					baseDir: ['./dist']
					directory: false
		2000
	)
