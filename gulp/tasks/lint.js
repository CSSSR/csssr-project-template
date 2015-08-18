import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import eslint       from 'gulp-eslint';
import errorHandler from '../utils/errorHandler';

gulp.task('lint', () => (
	gulp.src('**/*.js', {cwd: 'app'})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(eslint())
		.pipe(eslint.format())
));
