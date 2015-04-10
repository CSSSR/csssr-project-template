gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
concat       = require 'gulp-concat'
uglify       = require 'gulp-uglify'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'scripts', ->
	return gulp.src [
			'components/svg4everybody/svg4everybody.min.js'
			'components/FlipClock/compiled/flipclock.min.js'
			'app/scripts/common.js'
			'app/scripts/views/header.js'
			'app/scripts/views/select2.js'
			'app/scripts/views/wheel-filter.js'
			'app/scripts/views/slick.js'
			'app/scripts/views/rating.js'
			'app/scripts/views/collapsable.js'
		]
		.pipe plumber errorHandler: errorHandler
		.pipe concat 'common.min.js'
		.pipe gulpif !gutil.env.debug, uglify()
		.pipe gulp.dest paths.scripts
