gulp         = require 'gulp'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
concat       = require 'gulp-concat'
uglify       = require 'gulp-uglify'
handleErrors = require '../util/handleErrors'
paths        = require '../paths'

gulp.task 'scripts', ->
	return gulp.src [
			'debug.js'
#			'libs/jquery/dist/jquery.min.js'
			'!libs/**/*'
			'common.js'
		],
		cwd: 'app/scripts'
		.pipe concat 'common.min.js'
		.on 'error', handleErrors
		.pipe gulpif !gutil.env.debug, uglify()
		.on 'error', handleErrors
		.pipe gulp.dest paths.scripts

gulp.task 'scriptsLibs', ->
	return gulp.src [
			'libs/**/*'
		],
		cwd: 'app/scripts'
	.pipe gulp.dest paths.scriptsLibs
