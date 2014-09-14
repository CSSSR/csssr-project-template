requireDir = require 'require-dir'

requireDir './gulp/tasks' recurse: true

# gulp = require 'gulp'
# rimraf = require 'rimraf'
# spritesmith = require 'gulp.spritesmith'
# imagemin = require 'gulp-imagemin'
# jade = require 'gulp-jade'
# prettify = require 'gulp-prettify'
# stylish = require 'jshint-stylish'
# jshint = require 'gulp-jshint'
# uglify = require 'gulp-uglify'
# stylus = require 'gulp-stylus'
# autoprefixer = require 'gulp-autoprefixer'
# cmq = require 'gulp-combine-media-queries'
# csscomb = require 'gulp-csscomb'
# webserver = require 'gulp-webserver'
# livereload = require 'gulp-livereload'
# bump = require 'gulp-bump'

# pkg = require './package.json'

# paths =
# 	assets: '/assets/' + pkg.version + '/'
# 	distAssets: 'dist/assets/' + pkg.version + '/'
# 	images: 'dist/assets/' + pkg.version + '/images'
# 	scripts: 'dist/assets/' + pkg.version + '/scripts'
# 	styles: 'dist/assets/' + pkg.version + '/styles'

# gulp.task 'rimraf', (cb) ->
# 	rimraf 'dist', cb

# gulp.task 'spritesmith', ->
# 	spriteData = gulp.src 'app/images/sprite/**/*.png', read: false
# 		.pipe spritesmith
# 			imgName: 'sprite.png'
# 			cssName: 'sprite.styl'
# 			imgPath: '../images/sprite.png'
# 			cssFormat: 'stylus'
# 			algorithm: 'binary-tree'
# 			padding: 8
# 			engine: 'pngsmith'
# 			imgOpts:
# 				format: 'png'

# 	spriteData.img.pipe gulp.dest 'app/images'
# 	spriteData.css.pipe gulp.dest 'app/styles/helpers'

# gulp.task 'imagemin', ->
# 	gulp.src [
# 			'**/*.{png,jpg,gif}'
# 			'!sprite/**/*'
# 		],
# 			cwd: 'app/images'
# 		.pipe imagemin
# 			optimizationLevel: 3
# 			interlaced: true
# 			progressive: true
# 		.pipe gulp.dest paths.images

# gulp.task 'jade', ->
# 	gulp.src [
# 			'**/*.jade'
# 			'!{helpers,layouts,partials}/**/*'
# 		],
# 			cwd: 'app/templates'
# 		.pipe jade
# 			data:
# 				page:
# 					assets: paths.assets
# 					copyright: pkg.copyright
# 					description: pkg.description
# 					keywords: pkg.keywords.join ', '
# 					replyTo: pkg.bugs.email
# 					title: pkg.title
# 					version: pkg.version
# 		.pipe prettify
# 			brace_style: 'expand'
# 			indent_size: 1
# 			indent_char: '\t'
# 			indent_with_tabs: true
# 			condense: true
# 			indent_inner_html: true
# 			preserve_newlines: true
# 		.pipe gulp.dest 'dist'

# gulp.task 'stylus', ->
# 	gulp.src [
# 			'main.styl'
# 		],
# 			cwd: 'app/styles'
# 		.pipe stylus errors: true
# 		.pipe autoprefixer(
# 			'Android >= ' + pkg.browsers.android
# 			'Chrome >= ' + pkg.browsers.chrome
# 			'Firefox >= ' + pkg.browsers.firefox
# 			'Explorer >= ' + pkg.browsers.ie
# 			'iOS >= ' + pkg.browsers.ios
# 			'Opera >= ' + pkg.browsers.opera
# 			'Safari >= ' + pkg.browsers.safari
# 		)
# 		.pipe cmq()
# 		.pipe csscomb()
# 		.pipe gulp.dest paths.styles

# gulp.task 'jshint', ->
# 	gulp.src [
# 			'**/*.js'
# 			'!libs/**/*'
# 		],
# 			cwd: 'app/scripts'
# 		.pipe jshint()
# 		.pipe jshint.reporter 'jshint-stylish'

# gulp.task 'copy', ->
# 	gulp.src [
# 			'{data,fonts}/**/*'
# 			'images/svg/**/*.svg'
# 			'scripts/**/*.js'
# 			'!scripts/{main}.js'
# 		],
# 			base: 'app'
# 			cwd: 'app'
# 		.pipe gulp.dest paths.distAssets

# 	gulp.src 'app/favicon.ico'
# 		.pipe gulp.dest 'dist'

# gulp.task 'webserver', ->
# 	gulp.src './dist'
# 		.pipe webserver
# 			#livereload: true
# 			port: 3000

# gulp.task 'watch', ->
# 	gulp.watch 'app/images/sprite/**/*.png', ['spritesmith']

# 	gulp.watch [
# 		'app/images/**/*.{png,jpg,gif}',
# 		'!app/images/sprite/**/*'
# 	], ['imagemin']

# 	gulp.watch 'app/styles/**/*.styl', ['stylus']

# 	gulp.watch [
# 		'app/templates/**/*.jade'
# 	], ['jade']

# 	livereload.listen()

# 	gulp.watch 'dist/**/*'
# 		.on 'change', -> livereload.changed()

# gulp.task 'bump', ->
# 	gulp.src 'package.json'
# 		.pipe bump()
# 		.pipe gulp.dest './'

# gulp.task 'bump:patch', ['bump']

# gulp.task 'bump:minor', ->
# 	gulp.src 'package.json'
# 		.pipe bump type: 'minor'
# 		.pipe gulp.dest './'

# gulp.task 'bump:major', ->
# 	gulp.src 'package.json'
# 		.pipe bump type: 'major'
# 		.pipe gulp.dest './'

# gulp.task 'bump:reset', ->
# 	gulp.src 'package.json'
# 		.pipe bump version: '0.1.0'
# 		.pipe gulp.dest './'

# gulp.task 'imagesAndStyles', ['spritesmith'], ->
# 	gulp.start(
# 		'imagemin'
# 		'stylus'
# 	)

# gulp.task 'all', ['rimraf'], ->
# 	gulp.start(
# 		'imagesAndStyles'
# 		'jade'
# 		'copy'
# 	)

# gulp.task 'default', ['all'], ->
# 	gulp.start(
# 		'watch'
# 		'webserver'
# 	)
