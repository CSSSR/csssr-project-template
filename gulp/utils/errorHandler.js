import gutil from 'gulp-util';

export default function (error) {
	gutil.log([
		(error.name + ' in ' + error.plugin).bold.red,
		'',
		error.message,
		''
	].join('\n'));

	// Run with `--beep`
	if (gutil.env.beep) {
		gutil.beep();
	}

	// Keep gulp from hanging on this task
	this.emit('end');
};
