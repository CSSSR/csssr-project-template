import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
	global.watch = true;

	watch('app/sprite/**/*.png', gulp.start(
		'sprite'
	));

	watch('app/{styles,blocks}/**/*.styl', () => runSequence(
		'styles',
		() => reload('assets/styles/app.min.css')
	));

	watch('app/{pages,blocks}/**/*.jade', () => runSequence(
		'templates',
		reload
	));

	watch('app/resources/**/*', () => runSequence(
		'copy',
		reload
	));

	gulp.start('watchScripts');

	watch('app/icons/**/*.svg', () => runSequence(
		'icons',
		reload
	));
});
