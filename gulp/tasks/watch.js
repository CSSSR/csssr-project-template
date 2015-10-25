import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
	global.watch = true;

	watch('app/sprite/**/*.png', gulp.start(
		'sprite'
	));

	watch([
		'app/{styles,blocks}/**/*.styl',
		'!app/blocks/_'
	], () => runSequence(
		'styles',
		() => reload('assets/styles/app.min.css')
	));

	watch('app/{pages,blocks}/**/*.jade', () => runSequence(
		'templates',
		reload
	));

	watch('app/{blocks,pages}/**/*.json')
		.on('change', (file) => {
			global.changedJSON = file;
			return runSequence('templates:clear', 'templates', reload);
		});

	watch('app/resources/**/*', () => runSequence(
		'copy',
		reload
	));

	watch('app/scripts/**/*.js', () => gulp.start(
		'scripts',
		'lint',
		reload
	));

	watch('app/icons/**/*.svg', () => runSequence(
		'icons',
		reload
	));
});
