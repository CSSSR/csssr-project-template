gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
rupture      = require 'rupture'
stylus       = require 'gulp-stylus'
autoprefixer = require 'autoprefixer-core'
postcss      = require 'gulp-postcss'
cmq          = require 'gulp-combine-media-queries'
minifyCss    = require 'gulp-minify-css'
csscomb      = require 'gulp-csscomb'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'
pkg          = require '../../package.json'


gulp.task 'stylus', ->
	processors = [
		autoprefixer (
			browsers: [
				'Android >= ' + pkg.browsers.android
				'Chrome >= ' + pkg.browsers.chrome
				'Firefox >= ' + pkg.browsers.firefox
				'Explorer >= ' + pkg.browsers.ie
				'iOS >= ' + pkg.browsers.ios
				'Opera >= ' + pkg.browsers.opera
				'Safari >= ' + pkg.browsers.safari
			]
		)
	]

	return gulp.src ['common.styl'], cwd: 'app/styles'
		.pipe plumber errorHandler: errorHandler
		.pipe stylus errors: true, use: rupture()
		.pipe postcss(processors), cmq()
		.pipe gulpif !gutil.env.debug, minifyCss()
		.pipe gulpif gutil.env.csscomb, csscomb()
		.pipe gulp.dest paths.styles
