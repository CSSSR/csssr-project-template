import gulp    from 'gulp';
import changed from 'gulp-changed';
import filter  from 'gulp-filter';
import gutil   from 'gulp-util';
import gulpif  from 'gulp-if';
import paths   from '../paths';

gulp.task('copy:images', () => (
	gulp.src([
			'**/*.{png,jpg,gif}',
			'!sprite/**/*'
		], {
			cwd: paths.appImages
		})
		.pipe(gulp.dest(paths.images))
));

gulp.task('copy:resources', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed(paths.dist))
		.pipe(gulpif(!gutil.env.robots, filter((file) => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest(paths.dist))
));

gulp.task('copy', [
	'copy:images',
	'copy:resources'
]);
