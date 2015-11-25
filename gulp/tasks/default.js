import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('stylesDependences', () => (
	runSequence(
		'sprite',
		'icons',
		'styles'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'stylesDependences',
			'templates',
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
