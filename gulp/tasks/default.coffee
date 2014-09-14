gulp  = require 'gulp'

gulp.task 'imagesAndStyles', ['spritesmith'], ->
	return gulp.start(
			'imagemin'
			'stylus'
		)

gulp.task 'all', ['del'], ->
	return gulp.start(
			'imagesAndStyles'
			'jade'
			'copy'
			'jscs'
			'jshint'
		)

gulp.task 'default', ['all', 'livereload']
