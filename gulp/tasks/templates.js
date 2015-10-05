import path         from 'path'
import fs           from 'fs'
import _            from 'underscore'
import gulp         from 'gulp';
import gutil        from 'gulp-util'
import gulpif       from 'gulp-if';
import plumber      from 'gulp-plumber';
import jade         from 'gulp-jade';
import inheritance  from 'gulp-jade-inheritance';
import data         from 'gulp-data'
import cached       from 'gulp-cached';
import filter       from 'gulp-filter';
import rename       from 'gulp-rename';
import prettify     from 'gulp-html-prettify';
import pkg          from '../../package.json';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';
import getData      from '../utils/getData';
import getBlockData from '../utils/getBlockData';

let defaultData = {
	getData: getData,
	getBlockData: getBlockData,
	jv0: 'javascript:void(0);',
	timestamp: +new Date(),
	isDebug: !!gutil.env.debug
};

let getJSONFileName = (file) => {
	let page = ((path.basename(file.path)).split('.jade'))[0];
	let jsonFilename = './app/pages/'+ page + '/' + page + '.json';

	if (page === 'default') {
		jsonFilename = './app/pages/'+ page + '.json';
	}

	return jsonFilename;

	// return './app/pages/'+ (((path.basename(file.path)).split('.jade'))[0]) + '.json';
}

let requireJSONAsync = (fileName, cb) => {
	fs.readFile(fileName, (err, data) => {
		cb(err ? {} : JSON.parse(data));
	})
}

let getPromisedJSON = (filename) =>
	new Promise((resolve, reject) => {
		requireJSONAsync(filename, (data) => {
			resolve(data);
		})
	})


gulp.task('templates:clear', () => {
	if (Boolean(global.changedJSON) === true) {
		let pageFilename = global.changedJSON.split('.')[0] + '.jade';
		// let pageFilePath = pageFilename.split(path.delimiter); // path.sep
		let pageFilePath = pageFilename.split('\\');

		if (pageFilePath[pageFilePath.length - 1] === 'default.jade') {
			delete(cached.caches.jade);

		} else {
			for (let i in cached.caches.jade) {
				if (pageFilename === i) {
					delete(cached.caches.jade[pageFilename]);
				}
			}
		}

		delete(global.changedJSON);
	}

	return gulp;
})

gulp.task('templates', () => {
	return gulp.src('app/**/*.jade')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter((file) => /app[\\\/]pages[\\\/][^_]/.test(file.path)))
		.pipe(data((file, cb) => {
			let json = _.extend({}, defaultData)
			let promises = [];

			if (file.data)
				json = _.extend(file.data, json)

			promises.push(getPromisedJSON(getJSONFileName({path:'default'})));

			let pageType = (((path.basename(file.path)).split('.jade'))[0]);
			let typeParts = pageType.split('-');
			let str = '';

			json.pageType = (((path.basename(file.path)).split('.jade'))[0]);

			for (let i = 0; i < typeParts.length; i++) {
				if (str !== '') {
					str += '-';
				} else {
					json.pageType = typeParts[i];
				}

				str += typeParts[i];
				promises.push(getPromisedJSON(getJSONFileName({path: str})));
			}

			Promise.all(promises).then((data) => {
				for (let i = 0; i < data.length; i++) {
					json = _.extend(json, data[i]);
				}

				cb(undefined, json);
			});
		}))
		.pipe(jade())
		.pipe(prettify({
			brace_style: 'expand',
			indent_size: 1,
			indent_char: '\t',
			indent_inner_html: true,
			preserve_newlines: true
		}))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest(paths.dist))
});
