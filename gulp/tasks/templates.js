import path         from 'path'
import fs           from 'fs'
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

let getTmplByJSON = (filename) => {
	let bpName = path.basename(filename, '.json');
	const dirName = path.dirname(filename);
	const tree = dirName.split(path.sep);
	if (bpName !== 'default')
		bpName = tree[tree.length - 1]; // [block|page]Name

	tree.push(bpName + '.jade');
	return path.join(...tree);
}

gulp.task('templates:clear', () => {
	if (Boolean(global.changedJSON) === true) {
		let jadeFileName = getTmplByJSON(global.changedJSON);
		let baseName = path.basename(jadeFileName);

		if (baseName === 'default.jade') {
			console.log('clearing all cache');
			delete(cached.caches.jade);

		} else {
			for (let i in cached.caches.jade) {
				if (jadeFileName === i) {
					console.log('clearing cache for ' + jadeFileName);
					delete(cached.caches.jade[jadeFileName]);
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
			let json = Object.assign({}, defaultData)
			let promises = [];

			if (file.data)
				json = Object.assign(file.data, json)

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
					json = Object.assign(json, data[i]);
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
