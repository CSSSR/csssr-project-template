gulp = require 'gulp'

gulp.task 'watch', ->
	gulp.watch 'app/images/sprite/**/*.png', ['spritesmith']

	gulp.watch [
			'app/images/**/*.{png,jpg,gif}'
			'!app/images/sprite/**/*'
		],
		['imagemin']

	gulp.watch 'app/styles/**/*.styl', ['stylus']

	gulp.watch 'app/templates/pages/*.jade', ->
		global.jadePageChanged = true
		gulp.start 'jade'

	gulp.watch [
			'app/templates/**/*.jade'
			'!app/templates/pages/**/*'
		],
		->
			global.jadePageChanged = false
			gulp.start 'jade'

	gulp.watch 'app/resources/**/*', ['copy:resources']

	gulp.watch 'app/scripts/**/*.js', [
		'scripts'
		'scriptsLibs'
		'jscs'
		'jshint'
	]
