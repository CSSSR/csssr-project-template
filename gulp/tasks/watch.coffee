gulp        = require 'gulp'
runSequence = require 'run-sequence'
reload      = require('browser-sync').reload

gulp.task 'watch', ->
	global.watch = true
	gulp.watch 'app/sprite/**/*.png', ['spritesmith']

	gulp.watch 'app/{styles,blocks}/**/*.styl', ['stylus', -> reload('assets/styles/common.css')]

	gulp.watch 'app/{pages,blocks}/**/*.jade', -> runSequence 'jade', reload

	gulp.watch 'app/resources/**/*', ['copy:resources', reload]

	gulp.watch 'app/scripts/**/*.js', [
			'scripts'
			# 'eslint'
			reload
		]

	gulp.watch 'app/icons/**/*.svg', ['svg', reload]
