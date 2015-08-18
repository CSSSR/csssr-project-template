import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import spritesmith  from 'gulp.spritesmith';
import imagemin     from 'gulp-imagemin';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';

gulp.task('sprite', () => {
	let spriteData = gulp.src('app/sprite/**/*.png', {read: false})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.styl',
			imgPath: '../images/sprite.png',
			cssFormat: 'stylus',
			algorithm: 'binary-tree',
			padding: 8,
			engine: 'pngsmith',
			imgOpts: {
				format: 'png'
			}
		}));

	spriteData.img
		.pipe(imagemin({optimizationLevel: 3}))
		.pipe(gulp.dest(paths.images));

	return spriteData.css.pipe(gulp.dest(paths.appStylesHelpers));
});
