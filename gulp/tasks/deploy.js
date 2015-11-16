import gulp from 'gulp';
import runSequence from 'run-sequence';
import ghpages from 'gulp-gh-pages';

gulp.task('deploy', () => (
	gulp.src(['dist/**/*', '!dist/robots.txt']).pipe(ghpages({branch: 'dist'}))
));
