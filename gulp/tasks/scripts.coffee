fs           = require 'fs'
gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
gutil        = require 'gulp-util'
gulpif       = require 'gulp-if'
browserify   = require 'browserify'
babelify     = require 'babelify'
concat       = require 'gulp-concat'
uglify       = require 'gulp-uglify'
merge        = require 'merge-stream'
rename       = require 'gulp-rename'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'scripts', ->
	browserify debug: gutil.env.debug
		.transform babelify
		.require 'scripts/app.js', entry: true
		.bundle()
		.on 'error', (err) -> console.log 'Error: ' + err.message
		.pipe fs.createWriteStream 'dist/assets/scripts/app.min.js'
