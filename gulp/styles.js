import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import rupture from 'rupture';
import stylus from 'gulp-stylus';
import autoprefixer from 'autoprefixer-stylus';
import gcmq from 'gulp-group-css-media-queries';
import minifyCss from 'gulp-minify-css';
import csscomb from 'gulp-csscomb';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';

gulp.task('styles', () => (
	gulp.src('*.styl', {
		cwd: 'app/styles',
		nonull: true
	})
		.pipe(plumber({errorHandler: errorHandler('Error in styles task')}))
		.pipe(stylus({
			use: [
				rupture(),
				autoprefixer()
			],
			sourcemap: !!gutil.env.debug && {
				comment: false,
				inline: true
			}
		}))
		.pipe(gulpif(!gutil.env.debug, gcmq()))
		.pipe(gulpif(!gutil.env.debug, minifyCss()))
		.pipe(gulpif(gutil.env.csscomb, csscomb()))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/assets/styles'))
));
