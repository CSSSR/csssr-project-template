gulp         = require 'gulp'
gulpif       = require 'gulp-if'
plumber      = require 'gulp-plumber'
jade         = require 'gulp-jade'
inheritance  = require 'gulp-jade-inheritance'
cached       = require 'gulp-cached'
filter       = require 'gulp-filter'
rename       = require 'gulp-rename'
prettify     = require 'gulp-html-prettify'
pkg          = require '../../package.json'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'
getData      = require '../utils/getData'

data =
	getData: getData
	jv0: 'javascript:void(0);'
	timestamp: +new Date()

gulp.task 'jade', ->
	gulp.src 'app/**/*.jade'
		.pipe plumber errorHandler: errorHandler
		.pipe cached 'jade'
		.pipe gulpif global.watch, inheritance basedir: 'app'
		.pipe filter (file) -> /app[\\\/]pages/.test file.path
		.pipe jade data: data
		.pipe prettify
			brace_style: 'expand'
			indent_size: 1
			indent_char: '\t'
			indent_inner_html: true
			preserve_newlines: true
		.pipe rename dirname: '.'
		.pipe gulp.dest paths.dist
