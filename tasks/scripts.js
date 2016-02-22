import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import statsLogger from 'webpack-stats-logger';
import makeWebpackConfig from '../webpack.conf.js';

const { NODE_ENV, NOTIFY } = process.env;
const isDebug = NODE_ENV !== 'production';

function runWebpack(watch = false) {

	const webpackConfig = makeWebpackConfig({
		watch,
		debug: isDebug,
		sourcemaps: isDebug,
		notify: NOTIFY
	});

	return gulp
		.src('app/scripts/app.js')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'scripts' task`)}))
		.pipe(webpackStream(webpackConfig, null, statsLogger))
		.pipe(gulp.dest('dist/assets/scripts'));
}

gulp.task('scripts', () => {
	return runWebpack(false);
});

gulp.task('scripts:watch', () => {
	return runWebpack(true);
});
