gulp        = require 'gulp'
runSequence = require 'run-sequence'
reload      = require('browser-sync').reload

gulp.task 'watch', ->
	global.watch = true
	gulp.watch 'images/sprite/**/*.png', ['spritesmith']

	gulp.watch 'styles/**/*.styl', ['stylus', -> reload('assets/styles/common.css')]

	gulp.watch 'templates/**/*.jade', -> runSequence 'jade', reload

	gulp.watch 'resources/**/*', ['copy:resources', reload]

	gulp.watch 'scripts/**/*.js', [
			'scripts'
			# 'eslint'
			reload
		]

	gulp.watch 'icons/**/*.svg', ['svg', reload]
