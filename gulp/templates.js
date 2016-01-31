import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';
import getData from 'jade-get-data';

const data = {
	getData: getData('app/data'),
	jv0: 'javascript:void(0);',
	timestamp: Date.now()
};

gulp.task('templates', () => (
	gulp.src('app/**/*.jade')
		.pipe(plumber({errorHandler: errorHandler('Error in \'templates\' task')}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(jade({basedir: 'app', data}))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist'))
));
