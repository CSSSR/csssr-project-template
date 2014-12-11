gulp         = require 'gulp'
stylus       = require 'gulp-stylus'
autoprefixer = require 'gulp-autoprefixer'
cmq          = require 'gulp-combine-media-queries'
csscomb      = require 'gulp-csscomb'
handleErrors = require '../util/handleErrors'
paths        = require '../paths'
pkg          = require '../../package.json'

gulp.task 'stylus', ->
	return gulp.src ['common.styl'], cwd: 'app/styles'
		.pipe stylus errors: true
		.on 'error', handleErrors
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
		.pipe csscomb()
		.pipe gulp.dest paths.styles
