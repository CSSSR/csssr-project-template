import path from 'path';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import stylish from 'eslint/lib/formatters/stylish';
import notifier from 'node-notifier';
import paths from '../paths';

function runWebpack(watch = false) {
	console.log(path.join(__dirname, '../error-icon.png'))
	const webpackConfig = {
		watch,
		bail: true,
		profile: true,
		output: {
			filename: 'app.min.js'
		},
		devtool: gutil.env.sourcemaps ? 'source-map' : 'eval',
		debug: true,
		resolve: {
			modulesDirectories: [
				'node_modules'
			],
			extensions: ['.js', '']
		},
		module: {
			loaders: [{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}, {
				test: /\.json$/,
				loader: 'json'
			}, {
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}]
		},
		eslint: {
			configFile: path.join(__dirname, '../../.eslintrc'),
			emitError: true,
			emitWarning: true,
			formatter: errors => {
				if (errors[0].messages) {
					const error = errors[0].messages.find(msg => msg.severity === 2);
					if (error) {
						notifier.notify({
							title: error.message,
							message: `${error.line}:${error.column} ${error.source.trim()}`,
							icon: path.join(__dirname, '../utils/error-icon.png')
						});
					}
				}
			}
		}
	};

	return gulp
		.src('app/scripts/app.js')
		.pipe(webpack(webpackConfig, null, (err, stats) => {
			const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
			const durations = (stats.endTime - stats.startTime);
			const formatedDurations = durations > 1000 ? `${durations / 1000} s` : `${durations} ms`;
			const prompt = `[${gutil.colors.gray(time)}] [${gutil.colors.yellow('webpack')}]`;
			const message = `Complited in ${gutil.colors.magenta(formatedDurations)}`;
			console.log(`${prompt} ${message}`);
		}))
		.pipe(gulpif(!gutil.env.debug, uglify()))
		.pipe(gulp.dest(paths.scripts));
}

gulp.task('scripts', () => {
	return runWebpack(false);
});

gulp.task('watchScripts', () => {
	return runWebpack(true);
});
