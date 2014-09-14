gulp        = require 'gulp'
spritesmith = require 'gulp.spritesmith'
paths       = require '../paths'

gulp.task 'spritesmith', ->
	spriteData = gulp.src 'app/images/sprite/**/*.png', read: false
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

	spriteData.img.pipe gulp.dest paths.appImages
	spriteData.css.pipe gulp.dest paths.appStylesHelpers

	return spriteData
