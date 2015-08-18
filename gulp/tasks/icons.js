import gulp       from 'gulp';
import svgSymbols from 'gulp-svg-symbols';
import gulpif     from 'gulp-if';
import rename     from 'gulp-rename';
import paths      from '../paths';
import path       from 'path';

gulp.task('icons', () => (
	gulp.src('app/icons/**/*.svg')
		.pipe(svgSymbols({
			title: false,
			id: 'icon_%f',
			className: '%f',
			templates: [
				path.join(__dirname, '../utils/svg.styl'),
				'default-svg'
			]
		}))
		.pipe(gulpif(/\.styl$/, gulp.dest('app/styles/helpers')))
		.pipe(gulpif(/\.svg$/, rename('icon.svg')))
		.pipe(gulpif(/\.svg$/, gulp.dest('dist/assets/images/')))
));
