gulp     = require 'gulp'
gulpif   = require 'gulp-if'
changed  = require 'gulp-changed'
jade     = require 'gulp-jade'
prettify = require 'gulp-prettify'
pkg      = require '../../package.json'
paths    = require '../paths'

gulp.task 'jade', ->
	return gulp.src 'app/templates/pages/**/*.jade'
		.pipe jade
			data:
				page:
					copyright: pkg.copyright
					description: pkg.description
					keywords: pkg.keywords.join ', '
					title: pkg.title
		.pipe gulpif global.jadeChanged, changed paths.dist
		.pipe prettify
			brace_style: 'expand'
			indent_size: 1
			indent_char: '\t'
			indent_with_tabs: true
			condense: true
			indent_inner_html: true
			preserve_newlines: true
		.pipe gulp.dest paths.dist
