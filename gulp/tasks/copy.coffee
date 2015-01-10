gulp    = require 'gulp'
changed = require 'gulp-changed'
paths   = require '../paths'

gulp.task 'copy:resources', ->
	return gulp.src 'app/resources/**/*'
		.pipe changed paths.dist
		.pipe gulp.dest paths.dist

gulp.task 'copy:images', ->
	return gulp.src [
			'**/*.{png,jpg,gif}'
			'!sprite/**/*'
		],
			cwd: paths.appImages
		.pipe gulp.dest paths.images

gulp.task 'copy', ['copy:resources', 'copy:images']
