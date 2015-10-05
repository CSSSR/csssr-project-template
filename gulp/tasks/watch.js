import gulp        from 'gulp';
import runSequence from 'run-sequence';
import { reload }  from 'browser-sync';

gulp.task('watch', () => {
	global.watch = true;

	gulp.watch('app/sprite/**/*.png', ['sprite']);

	gulp.watch([
		'app/{styles,blocks}/**/*.styl',
		'!app/blocks/_'
	], ['styles', () => reload('assets/styles/app.min.css')]);

	gulp.watch('app/{blocks,pages}/**/*.jade', () => runSequence('templates', reload));

	gulp.watch('app/{blocks,pages}/**/*.json')
		.on('change', (file) => {
			// TODO: watch for non-default data
			global.changedJSON = file.path;
			console.log('changed json: ' + global.changedJSON);
			return runSequence('templates:clear', 'templates', reload);
		});

	gulp.watch('app/resources/**/*', ['copy:resources', reload]);

	gulp.watch('app/scripts/**/*.js', [
		'scripts',
		'lint',
		reload
	]);

	gulp.watch('app/icons/**/*.svg', ['icons', reload])
});
