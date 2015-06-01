gulp    = require 'gulp'
changed = require 'gulp-changed'
filter  = require 'gulp-filter'
gutil   = require 'gulp-util'
gulpif  = require 'gulp-if'
paths   = require '../paths'


gulp.task 'copy:images', ->
	gulp.src [
			'**/*.{png,jpg,gif}'
			'!sprite/**/*'
		],
			cwd: paths.appImages
		.pipe gulp.dest paths.images

gulp.task 'copy:resources', ->
	gulp.src 'resources/**/*'
		.pipe changed paths.dist
		.pipe gulpif !gutil.env.robots, filter (file) ->
			!/resources[\\\/]robots\.txt/.test file.path
		.pipe gulp.dest paths.dist

gulp.task 'copy', [
		'copy:images'
		'copy:resources'
	]
