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

let defaultData = {
	getData: getData,
	jv0: 'javascript:void(0);',
	timestamp: +new Date(),
	isDebug: !!gutil.env.debug
};

let getJSONFileName = (file) => {
	return './app/data/pages/'+ (((path.basename(file.path)).split('.jade'))[0]) + '.json';
}

let requireJSONAsync = (fileName, cb) => {
	fs.readFile(fileName, (err, data) => {
		cb(err ? {} : JSON.parse(data));
	})
}

let getPromisedJSON = (filename, json) => {
	return new Promise((resolve, reject) => {
		requireJSONAsync(filename, (data) => {
			json = _.extend(json, data);
			resolve('resolve ' + filename);
		})
	})
}

gulp.task('templates-clear', () => {
	delete(cached.caches['jade']);
	return gulp;
})

gulp.task('templates', () => {
	return gulp.src('app/**/*.jade')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter((file) => /app[\\\/]pages/.test(file.path)))
		.pipe(data((file, cb) => {
			let json = _.extend({}, defaultData)

			if (file.data)
				json = _.extend(file.data, json)

			json.pageType = (((path.basename(file.path)).split('.jade'))[0]);

			let jsonCommonFileName = getJSONFileName({path:'default'});
			let jsonPageFileName = getJSONFileName(file);

			Promise.all([
				getPromisedJSON(jsonCommonFileName, json),
				getPromisedJSON(jsonPageFileName, json)
			]).then(() => {
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
