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
				'resources'
				'scripts'
				'dist'
			]
			routes:
				'/assets/images': 'app/images'
				'/assets/images/svg': 'app/resources/assets/images/svg'
				'/assets/scripts': 'app/scripts'
			directory: false
		tunnel: !!gutil.env.tunnel
