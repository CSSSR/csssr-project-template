gulp        = require 'gulp'
svgSymbols  = require 'gulp-svg-symbols'
gulpif      = require 'gulp-if'
rename      = require 'gulp-rename'
paths       = require '../paths'
path        = require 'path'

gulp.task 'svg', ->
	gulp.src 'icons/**/*.svg'
		.pipe svgSymbols
			title: false
			id: 'icon_%f'
			className: '%f'
			templates: [
				path.join __dirname, '../utils/svg.styl'
				'default-svg'
			]
		.pipe gulpif /\.styl$/, gulp.dest 'styles/helpers'
		.pipe gulpif /\.svg$/, rename 'icon.svg'
		.pipe gulpif /\.svg$/, gulp.dest 'dist/assets/images/'
