browserSync   = require 'browser-sync'
gulp          = require 'gulp'
gutil         = require 'gulp-util'
debugInjecter = require '../utils/debugInjecter'

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
			routes:
				'/assets/scripts': 'app/scripts'
			directory: false
			middleware: if !!gutil.env.debug then [debugInjecter] else []
		tunnel: !!gutil.env.tunnel
