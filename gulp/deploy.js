import gulp from 'gulp';
import ghpages from 'gulp-gh-pages';

gulp.task('deploy', () => (
	gulp.src(['dist/**/*', '!dist/robots.txt']).pipe(ghpages({branch: 'dist'}))
));
