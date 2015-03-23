gulp        = require 'gulp'
runSequence = require 'run-sequence'
reload      = require('browser-sync').reload

gulp.task 'watch', ->
	gulp.watch 'app/images/sprite/**/*.png', ['spritesmith']

	gulp.watch [
			'app/images/**/*.{png,jpg,gif}'
			'!app/images/sprite/**/*'
		],
		['imagemin']

	gulp.watch 'app/styles/**/*.styl', ['stylus', -> reload('assets/styles/common.css')]

	gulp.watch 'app/templates/**/*.jade', -> runSequence 'jade', reload

	gulp.watch 'app/resources/**/*', ['copy:resources', reload]

	gulp.watch 'app/scripts/**/*.js', [
			'scripts'
			'jscs'
			'jshint'
			reload
		]

	gulp.watch 'app/images/svg/**/*.svg', ['svg', reload]