gulp    = require 'gulp'
changed = require 'gulp-changed'
paths   = require '../paths'


gulp.task 'copy:images', ->
	return gulp.src [
			'**/*.{png,jpg,gif}'
			'!sprite/**/*'
		],
			cwd: paths.appImages
		.pipe gulp.dest paths.images

gulp.task 'copy:resources', ->
	return gulp.src 'app/resources/**/*'
		.pipe changed paths.dist
		.pipe gulp.dest paths.dist

gulp.task 'copy:scripts', ->
	return gulp.src ['**/*.js'],
			base: 'app/scripts'
			cwd: 'app/scripts'
		.pipe changed paths.scripts
		.pipe gulp.dest paths.scripts

gulp.task 'copy:components', ->
	return gulp.src [
			'jquery/dist/jquery.min.js'
			'svg4everybody/svg4everybody.min.js'
			'select2/select2.min.js'
			'select2/select2.css'
		],
			base: 'components'
			cwd: 'components'
		.pipe changed paths.scripts
		.pipe gulp.dest paths.scripts + '/libs'

gulp.task 'copy', [
		'copy:components',
		'copy:images',
		'copy:resources',
		'copy:scripts'
	]
