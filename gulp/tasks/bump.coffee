gulp = require 'gulp'
bump = require 'gulp-bump'

gulp.task 'bump', ->
	return gulp.src 'package.json'
		.pipe bump()
		.pipe gulp.dest './'

gulp.task 'bump:patch', ['bump']

gulp.task 'bump:minor', ->
	return gulp.src 'package.json'
		.pipe bump type: 'minor'
		.pipe gulp.dest './'

gulp.task 'bump:major', ->
	return gulp.src 'package.json'
		.pipe bump type: 'major'
		.pipe gulp.dest './'

gulp.task 'bump:reset', ->
	return gulp.src 'package.json'
		.pipe bump version: '0.1.0'
		.pipe gulp.dest './'
