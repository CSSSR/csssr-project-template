import runSequence from 'run-sequence';
import gulp        from 'gulp';
import gutil       from 'gulp-util';

gulp.task('stylesDependences', () => (
	runSequence(
		'sprite',
		'icons',
		'styles'
	)
));

gulp.task('default', () => (
	runSequence([
			'stylesDependences',
			'templates',
			'scripts',
			'lint'
		],
		'server',
		'watch'
	)
));

gulp.task('build', ['del'], () => (
	gulp.start(
		'stylesDependences',
		'templates',
		'scripts',
		'copy'
	)
));
