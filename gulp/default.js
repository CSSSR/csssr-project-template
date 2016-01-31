import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprites',
		'icons',
		'styles'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'styles:dependencies',
			'styles:lint',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	gulp.start(
		'styles:dependencies',
		'templates',
		'scripts',
		'copy'
	)
));
