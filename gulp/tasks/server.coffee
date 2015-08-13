browserSync = require 'browser-sync'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
debuga      = require 'debuga'

gulp.task 'server', ->
	browserSync.init
		files: ['dist/**/*']
		open: !!gutil.env.open
		reloadOnRestart: true
		port: gutil.env.port || 3000
		server:
			baseDir: [
				'app/resources'
				'dist'
			]
			directory: false
			middleware: if !!gutil.env.debug then [debuga()] else []
		tunnel: !!gutil.env.tunnel
