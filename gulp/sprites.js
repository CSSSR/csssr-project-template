import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith-multi';
import merge from 'merge-stream';
import path from 'path';
import errorHandler from 'gulp-plumber-error-handler';

const imgPath = '../images/sprites/';
const tmplName = 'stylus_retina.template.handlebars';
const tmplPath = '../node_modules/spritesheet-templates/lib/templates';
const cssTemplate = path.join(__dirname, tmplPath, tmplName);

gulp.task('sprites', () => {
	const spriteData = gulp.src('app/sprites/**/*.png', {read: false})
		.pipe(plumber({errorHandler: errorHandler('Error in \'sprite\' task')}))
		.pipe(spritesmith({
			spritesmith: function (options, sprite, icons) {
				options.imgPath = imgPath + options.imgName;
				options.retinaImgPath = imgPath + options.retinaImgName;
				options.cssName = options.cssName.replace(/\.css$/, '.styl');
				options.cssFormat = 'stylus';
				options.cssTemplate = cssTemplate;
				options.algorithm = 'binary-tree';
				options.padding = 8;

				return options;
			}
		}));

	const imgStream = spriteData.img.pipe(gulp.dest('dist/assets/images/sprites'));
	const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));

	return merge(imgStream, styleStream);
});
