var gulp = require('gulp'),
	rimraf = require('gulp-rimraf'),
	cached = require('gulp-cached'),
	changed = require('gulp-changed'),
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),
	jade = require('gulp-jade'),
	prettify = require('gulp-prettify'),
	stylish = require('jshint-stylish'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	spritesmith = require('gulp.spritesmith'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	cmq = require('gulp-combine-media-queries'),
	csscomb = require('gulp-csscomb'),
	replace = require('gulp-replace-task'),
	rename = require('gulp-rename'),
	webserver = require('gulp-webserver'),
	livereload = require('gulp-livereload'),
	bump = require('gulp-bump'),
	pkg = require('./package.json'),
	paths = {
		assets: '/assets/' + pkg.version + '/',
		distAssets: 'dist/assets/' + pkg.version + '/',
		images: 'dist/assets/' + pkg.version + '/images',
		scripts: 'dist/assets/' + pkg.version + '/scripts',
		styles: 'dist/assets/' + pkg.version + '/styles'
	};

gulp.task('rimraf', function() {
	gulp.src('dist', {read: false})
		.pipe(rimraf());
});

gulp.task('spritesmith', function () {
	var spriteData = gulp.src('app/images/sprite/**/*.png', {read: false})
		.pipe(cached('spritesmith'))
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.styl',
			imgPath: '../images/sprite.png',
			cssFormat: 'stylus',
			algorithm: 'binary-tree',
			padding: 8,
			engine: 'pngsmith',
			imgOpts: {
				format: 'png'
			}
		}));

	spriteData.img.pipe(gulp.dest('app/images'));
	spriteData.css.pipe(gulp.dest('app/styles/helpers'));
});

gulp.task('imagemin', function () {
	gulp.src([
			'**/*.{png,jpg,gif}',
			'!sprite/**/*'
		], {
			cwd: 'app/images'
		})
		.pipe(cached('imagemin'))
		.pipe(imagemin({
			optimizationLevel: 3,
			interlaced: true,
			progressive: true
		}))
		.pipe(gulp.dest(paths.images));
});

gulp.task('jade', function () {
	gulp.src([
			'**/*.jade',
			'!{helpers,layouts,partials}/**/*'
		], {
			cwd: 'app/templates'
		})
		.pipe(cached('jade'))
		.pipe(jade({
			data: {
				page: {
					assets: paths.assets,
					copyright: pkg.copyright,
					description: pkg.description,
					keywords: pkg.keywords.join(', '),
					replyTo: pkg.bugs.email,
					title: pkg.title,
					version: pkg.version
				}
			}
		}))
		.pipe(prettify({
			brace_style: 'expand',
			indent_size: 1,
			indent_char: '\t',
			indent_with_tabs: true,
			condense: true,
			indent_inner_html: true,
			preserve_newlines: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('stylus', function () {
	gulp.src([
			'main.styl'
		], {
			cwd: 'app/styles'
		})
		.pipe(stylus({errors: true}))
		.pipe(autoprefixer(
			'Android >= ' + pkg.browsers.android,
			'Chrome >= ' + pkg.browsers.chrome,
			'Firefox >= ' + pkg.browsers.firefox,
			'Explorer >= ' + pkg.browsers.ie,
			'iOS >= ' + pkg.browsers.ios,
			'Opera >= ' + pkg.browsers.opera,
			'Safari >= ' + pkg.browsers.safari
		))
		.pipe(cmq())
		.pipe(csscomb())
		.pipe(gulp.dest(paths.styles));
});

gulp.task('jshint', function () {
	gulp.src([
			'**/*.js',
			'!libs/**/*',
			'!browsehappy/**/*',
			'browsehappy/browsehappy.js'
		], {
			cwd: 'app/scripts'
		})
		.pipe(cached('jshint'))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browsehappy', function () {
	gulp.src('app/scripts/browsehappy.js')
		.pipe(cached('browsehappy'))
		.pipe(replace({
			patterns: [{
				json: {
					android: pkg.browsers.android,
					chrome: pkg.browsers.chrome,
					firefox: pkg.browsers.firefox,
					ie: pkg.browsers.ie,
					ios: pkg.browsers.ios,
					opera: pkg.browsers.opera,
					safari: pkg.browsers.safari
				}
			}]
		}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.scripts));
});

gulp.task('copy', function () {
	gulp.src([
			'{data,fonts}/**/*',
			'images/svg/**/*.svg',
			'scripts/**/*.js',
			'!scripts/{browsehappy,main}.js'
		], {
			base: 'app',
			cwd: 'app'
		})
		.pipe(cached('copy'))
		.pipe(gulp.dest(paths.distAssets));

	gulp.src('app/favicon.ico')
		.pipe(gulp.dest('dist'));
});

gulp.task('replace', function () {
	gulp.src([
			'app/scripts/main.js'
		])
		.pipe(cached('replace'))
		.pipe(replace({
			patterns: [{
				json: {
					assets: paths.assets
				}
			}]
		}))
		.pipe(gulp.dest(paths.scripts));
});

gulp.task('webserver', function() {
	gulp.src('dist')
		.pipe(webserver({
			//livereload: true,
			port: 3000
		}));
});

gulp.task('watch', function () {
	gulp.watch('app/images/sprite/**/*.png', ['spritesmith']);

	gulp.watch(['app/images/**/*.{png,jpg,gif}', '!app/images/sprite/**/*'], ['imagemin']);

	gulp.watch('app/styles/**/*.styl', ['stylus']);

	gulp.watch(['app/templates/**/*.jade', '!app/templates/{helpers,layouts,partials}/**/*'], ['jade']);

	livereload.listen();

	gulp.watch('dist/**/*').on('change', livereload.changed);
});

gulp.task('bump', function () {
	gulp.src('package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('bump:patch', ['bump']);

gulp.task('bump:minor', function () {
	gulp.src('package.json')
		.pipe(bump({type: 'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:major', function () {
	gulp.src('package.json')
		.pipe(bump({type: 'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:reset', function () {
	gulp.src('package.json')
		.pipe(bump({version: '0.1.0'}))
		.pipe(gulp.dest('./'));
});

gulp.task('default', [
	//'rimraf',
	'watch',
	'jade',
	'stylus',
	'browsehappy',
	'replace',
	'spritesmith',
	'imagemin',
	'copy',
	'webserver'
]);
