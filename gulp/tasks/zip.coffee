gulp   = require 'gulp'
gutil  = require 'gulp-util'
gulpif = require 'gulp-if'
zip    = require 'gulp-zip'
paths  = require '../paths'

getDateTime = ->
	now = new Date
	year = now.getFullYear()
	month = if now.getMonth() < 10 then '0' + now.getMonth() + 1 else now.getMonth() + 1
	day = if now.getDate() < 10 then '0' + now.getDate() else now.getDate()
	hours = if now.getHours() < 10 then '0' + now.getHours() else now.getHours()
	minutes = if now.getMinutes() < 10 then '0' + now.getMinutes() else now.getMinutes()
	datetime = year + '-' + month + '-' + day + '-' + hours + '' + minutes
	datetime

gulp.task 'zip', ->
	datetime = if gutil.env.zipDateTime then '-' + getDateTime else ''
	zipName = 'dist' + datetime + '.zip'

	gulp.src 'dist/**/*'
		.pipe zip zipName
		.pipe gulp.dest paths.dist
