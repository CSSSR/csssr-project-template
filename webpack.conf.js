import path from 'path';
import stylish from 'eslint/lib/formatters/stylish';
import notifier from 'node-notifier';
import webpack from 'webpack';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import HappyPack from 'happypack';

const eslintFormatter = ({notify}) => errors => {
	if (errors[0].messages) {
		console.log(stylish(errors));
		if (notify) {
			const error = errors[0].messages.find(msg => msg.severity === 2);
			if (error) {
				notifier.notify({
					title: error.message,
					message: `${error.line}:${error.column} ${error.source.trim()}`,
					icon: path.join(__dirname, 'tasks/images/error-icon.png')
				});
			}
		}
	}
};

export default function makeWebpackConfig({
	watch = true,
	sourcemaps = false,
	debug = false,
	notify = false,
	eslint = true
}) {
	return {
		entry: path.resolve('./app/scripts/app.js'),
		watch,
		debug,
		bail: false,
		profile: true,
		output: {
			path: path.resolve('./dist/assets/scripts/'),
			filename: 'app.min.js',
			pathinfo: false
		},
		devtool: (sourcemaps || !debug) ? '#source-map' : 'eval',
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
				loader: 'happypack/loader',
				exclude: /node_modules/
			}, {
				test: /\.json$/,
				loader: 'json'
			}, eslint && {
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}, {
				test: require.resolve('jquery'),
				loader: 'expose?$!expose?jQuery'
			}].filter(loader => loader)
		},
		plugins: [
			new HappyPack({
				loaders: ['babel'],
				threads: 4,
				verbose: false,
				cache: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			})
		].concat(debug ? [
			new NpmInstallPlugin({saveDev: true}),
			new webpack.HotModuleReplacementPlugin()
		] : [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
		]),
		eslint: {
			configFile: path.join(__dirname, '.eslintrc'),
			emitErrors: false,
			emitWarning: true,
			formatter: eslintFormatter({notify})
		}
	};
}
