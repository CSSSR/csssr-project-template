gulp  = require 'gulp'

gulp.task 'imagesAndStyles', ['spritesmith'], ->
	return gulp.start(
			'imagemin'
			'stylus'
		)

gulp.task 'build', ->
	return gulp.start(
			'imagesAndStyles'
			'jade'
			'scripts'
			'copy'
		)

gulp.task 'default', [
		'build'
		'jscs'
		'jshint'
		'browserSync'
	]
