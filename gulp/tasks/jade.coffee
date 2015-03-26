gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
jade         = require 'gulp-jade'
inheritance  = require 'gulp-jade-inheritance'
cached       = require 'gulp-cached'
filter       = require 'gulp-filter'
rename       = require 'gulp-rename'
prettify     = require 'gulp-prettify'
pkg          = require '../../package.json'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'jade', ->
	gulp.src 'app/templates/**/*.jade'
		.pipe plumber errorHandler: errorHandler
		.pipe cached 'jade'
		.pipe inheritance basedir: 'app/templates'
		.pipe filter (file) -> /templates[\\\/]pages/.test file.path
		.pipe jade
			data:
				page:
					copyright: pkg.copyright
					description: pkg.description
					keywords: pkg.keywords.join ', '
					title: pkg.title
		.pipe prettify
			brace_style: 'expand'
			indent_size: 1
			indent_char: '\t'
			indent_with_tabs: true
			condense: true
			indent_inner_html: true
			preserve_newlines: true
		.pipe rename dirname: '.'
		.pipe gulp.dest paths.dist
