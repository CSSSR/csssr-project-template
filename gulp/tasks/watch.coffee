gulp        = require 'gulp'
runSequence = require 'run-sequence'
reload      = require('browser-sync').reload

gulp.task 'watch', ->
	global.watch = true

	gulp.watch 'app/sprite/**/*.png', ['sprite']

	gulp.watch 'app/{styles,blocks}/**/*.styl', ['styles', -> reload('assets/styles/app.min.css')]

	gulp.watch 'app/{pages,blocks}/**/*.jade', -> runSequence 'templates', reload

	gulp.watch 'app/resources/**/*', ['copy:resources', reload]

	gulp.watch 'app/scripts/**/*.js', [
			'scripts'
			'lint'
			reload
		]

	gulp.watch 'app/icons/**/*.svg', ['icons', reload]
