gulp         = require 'gulp'
plumber      = require 'gulp-plumber'
spritesmith  = require 'gulp.spritesmith'
imagemin     = require 'gulp-imagemin'
errorHandler = require '../utils/errorHandler'
paths        = require '../paths'

gulp.task 'spritesmith', ->
	spriteData = gulp.src 'app/images/sprite/**/*.png', read: false
		.pipe plumber errorHandler: errorHandler
		.pipe spritesmith
			imgName: 'sprite.png'
			cssName: 'sprite.styl'
			imgPath: '../images/sprite.png'
			cssFormat: 'stylus'
			algorithm: 'binary-tree'
			padding: 8
			engine: 'pngsmith'
			imgOpts:
				format: 'png'

	spriteData.img
		.pipe imagemin
			optimizationLevel: 3
		.pipe gulp.dest paths.appImages

	spriteData.css.pipe gulp.dest paths.appStylesHelpers

	spriteData
