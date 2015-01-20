browserSync = require 'browser-sync'
gulp        = require 'gulp'
gutil       = require 'gulp-util'

gulp.task 'browserSync', ->
	browserSync
		files: ['dist/**/*']
		open: false
		port: gutil.env.port || 3001
		server:
			baseDir: [
				'app/resources'
				'app/scripts'
				'dist'
			]
			routes:
				'/assets/images': 'app/images'
				'/assets/images/svg': 'app/resources/assets/images/svg'
				'/assets/scripts': 'app/scripts'
			directory: false
