import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
	global.watch = true;

	watch(['app/sprites/**/*.png', '!app/sprites/*.png'], () => runSequence('sprites'));
	watch('app/{styles,blocks}/**/*.styl', () => {
		gulp.start('styles:lint');
		runSequence('styles', () => reload('assets/styles/app.min.css'));
	});
	watch(['app/{pages,blocks}/**/*.jade'], () => runSequence('templates', reload));
	watch('app/resources/**/*', () => runSequence('copy', reload));
	watch('app/icons/**/*.svg', () => runSequence('icons', reload));

	gulp.start('scripts:watch');
});
