import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import paths from '../paths';

gulp.task('copy', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed(paths.dist))
		.pipe(gulpif(!gutil.env.robots, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest(paths.dist))
));
