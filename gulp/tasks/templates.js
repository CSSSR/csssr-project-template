import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import inheritance from 'gulp-jade-inheritance';
import gdata from 'gulp-data';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import prettify from 'gulp-html-prettify';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';
import getData from '../utils/getData';
import getBlockData from '../utils/getBlockData';
import gulpJsonData from '../utils/gulpJsonData';

const data = {
	getData,
	getBlockData,
	jv0: 'javascript:void(0);',
	timestamp: Date.now()
};

gulp.task('templates:clear', gulpJsonData.clearCached(cached));

gulp.task('templates', () => (
	gulp.src('app/**/*.jade')
		.pipe(plumber({errorHandler}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter(file => /app[\\\/]pages[\\\/][^_]/.test(file.path)))
		.pipe(gdata(gulpJsonData.bindData(data)))
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
));
