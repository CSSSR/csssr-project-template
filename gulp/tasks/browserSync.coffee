browserSync = require 'browser-sync'
gulp        = require 'gulp'
gutil       = require 'gulp-util'

gulp.task 'browserSync', ->
	browserSync.init
		files: ['dist/**/*']
		open: !!gutil.env.open
		port: gutil.env.port || 3000
		server:
			baseDir: [
				'app/resources'
				'dist'
			]
			routes:
				'/assets/scripts': 'app/scripts'
			directory: false
		tunnel: !!gutil.env.tunnel
