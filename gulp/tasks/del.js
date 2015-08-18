import gulp  from 'gulp';
import del   from 'del';
import paths from '../paths';

gulp.task('del', (cb) => del(paths.dist + '/*', cb));
