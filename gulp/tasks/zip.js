import gulp   from 'gulp';
import gutil  from 'gulp-util';
import gulpif from 'gulp-if';
import zip    from 'gulp-zip';
import paths  from '../paths';

let correctNumber = (number) => number < 10 ? '0' + number : number;

let getDateTime = () => {
	let now = new Date();
	let year = now.getFullYear();
	let month = correctNumber(now.getMonth() + 1);
	let day = correctNumber(now.getDate());
	let hours = correctNumber(now.getHours());
	let minutes = correctNumber(now.getMinutes());

	return year + '-' + month + '-' + day + '-' + hours + '' + minutes;
};

gulp.task('zip', () => {
	let datetime = gutil.env.zipDateTime ? '-' + getDateTime : '';
	let zipName = 'dist' + datetime + '.zip';

	gulp.src('dist/**/*')
		.pipe(zip(zipName))
		.pipe(gulp.dest(paths.dist))
});
