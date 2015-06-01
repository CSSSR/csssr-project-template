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
rename       = require 'gulp-rename'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'
pkg          = require '../../package.json'

gulp.task 'stylus', ->
	gulp.src ['app.styl'],
			cwd: 'styles'
			nonull: true
		.pipe plumber errorHandler: errorHandler
		.pipe stylus
			errors: true,
			use: rupture()
			sourcemap: if gutil.env.debug then comment: false, inline: true else false
		.pipe autoprefixer(
			'Android >= ' + pkg.browsers.android
			'Chrome >= ' + pkg.browsers.chrome
			'Firefox >= ' + pkg.browsers.firefox
			'Explorer >= ' + pkg.browsers.ie
			'iOS >= ' + pkg.browsers.ios
			'Opera >= ' + pkg.browsers.opera
			'Safari >= ' + pkg.browsers.safari
		)
		.pipe gulpif !gutil.env.debug, cmq()
		.pipe gulpif !gutil.env.debug, minifyCss()
		.pipe gulpif gutil.env.csscomb, csscomb()
		.pipe rename suffix: '.min'
		.pipe gulp.dest paths.styles
