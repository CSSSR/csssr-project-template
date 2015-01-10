gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
rupture      = require 'rupture'
stylus       = require 'gulp-stylus'
autoprefixer = require 'gulp-autoprefixer'
cmq          = require 'gulp-combine-media-queries'
minifyCss    = require 'gulp-minify-css'
csscomb      = require 'gulp-csscomb'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'
pkg          = require '../../package.json'

gulp.task 'stylus', ->
	return gulp.src ['common.styl'], cwd: 'app/styles'
		.pipe plumber errorHandler: errorHandler
		.pipe stylus errors: true, use: rupture()
		.pipe autoprefixer(
			'Android >= ' + pkg.browsers.android
			'Chrome >= ' + pkg.browsers.chrome
			'Firefox >= ' + pkg.browsers.firefox
			'Explorer >= ' + pkg.browsers.ie
			'iOS >= ' + pkg.browsers.ios
			'Opera >= ' + pkg.browsers.opera
			'Safari >= ' + pkg.browsers.safari
		)
		.pipe cmq()
		.pipe gulpif !gutil.env.debug, minifyCss(), csscomb()
		.pipe gulp.dest paths.styles
