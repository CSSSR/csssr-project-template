gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
jade         = require 'gulp-jade'
affected     = require 'gulp-jade-find-affected'
prettify     = require 'gulp-prettify'
pkg          = require '../../package.json'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'jade', ->
	return gulp.src 'app/templates/pages/**/*.jade'
		.pipe plumber errorHandler: errorHandler
		.pipe affected()
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
		.pipe gulp.dest paths.dist
