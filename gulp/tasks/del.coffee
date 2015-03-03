gulp   = require 'gulp'
del    = require 'del'
paths  = require '../paths'

gulp.task 'del', (cb) ->
	del paths.dist+'/*', cb
