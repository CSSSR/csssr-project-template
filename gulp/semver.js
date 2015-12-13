import gulp from 'gulp';
import bump from 'gulp-bump';

gulp.task('patch', () => (
	gulp.src('package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'))
));

gulp.task('minor', () => (
	gulp.src('package.json')
		.pipe(bump({type: 'minor'}))
		.pipe(gulp.dest('./'))
));

gulp.task('major', () => (
	gulp.src('package.json')
		.pipe(bump({type: 'major'}))
		.pipe(gulp.dest('./'))
));

gulp.task('semver:reset', () => (
	gulp.src('package.json')
		.pipe(bump({version: '0.1.0'}))
		.pipe(gulp.dest('./'))
));
