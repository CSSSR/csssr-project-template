gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
changed      = require 'gulp-changed'
imagemin     = require 'gulp-imagemin'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'imagemin', ->
	gulp.src [
			'**/*.{png,jpg,gif}'
			'!sprite/**/*'
		],
			cwd: 'app/images'
		.pipe plumber errorHandler: errorHandler
		.pipe changed paths.images
		.pipe imagemin
			optimizationLevel: 3
			interlaced: true
			progressive: true
		.pipe gulp.dest paths.appImages
