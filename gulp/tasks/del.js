import gulp from 'gulp';
import del from 'del';

gulp.task('del', cb => del('dist/*', cb));
