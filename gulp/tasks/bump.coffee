gulp = require 'gulp'
bump = require 'gulp-bump'

gulp.task 'bump', ->
	gulp.src 'package.json'
		.pipe bump()
		.pipe gulp.dest './'

gulp.task 'bump:patch', ['bump']

gulp.task 'bump:minor', ->
	gulp.src 'package.json'
		.pipe bump type: 'minor'
		.pipe gulp.dest './'

gulp.task 'bump:major', ->
	gulp.src 'package.json'
		.pipe bump type: 'major'
		.pipe gulp.dest './'

gulp.task 'bump:reset', ->
	gulp.src 'package.json'
		.pipe bump version: '0.1.0'
		.pipe gulp.dest './'
