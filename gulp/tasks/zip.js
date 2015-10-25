import gulp from 'gulp';
import gutil from 'gulp-util';
import zip from 'gulp-zip';
import paths from '../paths';

const correctNumber = number => number < 10 ? '0' + number : number;

const getDateTime = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = correctNumber(now.getMonth() + 1);
	const day = correctNumber(now.getDate());
	const hours = correctNumber(now.getHours());
	const minutes = correctNumber(now.getMinutes());

	return `${year}-${month}-${day}-${hours}${minutes}`;
};

gulp.task('zip', () => {
	const datetime = gutil.env.zipDateTime ? '-' + getDateTime : '';
	const zipName = 'dist' + datetime + '.zip';

	gulp.src('dist/**/*')
		.pipe(zip(zipName))
		.pipe(gulp.dest(paths.dist));
});
