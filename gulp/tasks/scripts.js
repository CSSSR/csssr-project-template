import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import stylish from 'eslint/lib/formatters/stylish';
import notifier from 'node-notifier';

function runWebpack(watch = false) {
	const webpackConfig = {
		watch,
		bail: true,
		profile: true,
		output: {
			filename: 'app.min.js'
		},
		devtool: (gutil.env.sourcemaps || !gutil.env.debug) ? '#source-map' : '#cheap-module-eval-source-map',
		debug: true,
		resolve: {
			modulesDirectories: [
				'node_modules'
			],
			extensions: ['.js', '']
		},
		module: {
			preLoaders: [{
				test: /\.js$/,
				loader: 'source-map-loader'
			}],
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
		plugins: gutil.env.debug ? [] : [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
		],
		eslint: {
			configFile: path.join(__dirname, '../../.eslintrc'),
			emitError: false,
			emitWarning: true,
			formatter: errors => {
				if (errors[0].messages) {
					console.log(stylish(errors));
					if (gutil.env.notify) {
						const error = errors[0].messages.find(msg => msg.severity === 2);
						if (error) {
							notifier.notify({
								title: error.message,
								message: `${error.line}:${error.column} ${error.source.trim()}`,
								icon: path.join(__dirname, '../images/error-icon.png')
							});
						}
					}
				}
			}
		}
	};

	return gulp
		.src('app/scripts/app.js')
		.pipe(webpackStream(webpackConfig, null, (err, stats) => {
			const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
			const durations = (stats.endTime - stats.startTime);
			const formatedDurations = durations > 1000 ? `${durations / 1000} s` : `${durations} ms`;
			const prompt = `[${gutil.colors.gray(time)}] [${gutil.colors.yellow('webpack')}]`;
			const message = `Complited in ${gutil.colors.magenta(formatedDurations)}`;
			console.log(`${prompt} ${message}`);
		}))
		.pipe(gulp.dest('dist/assets/scripts'));
}

gulp.task('scripts', () => {
	return runWebpack(false);
});

gulp.task('scripts:watch', () => {
	return runWebpack(true);
});
