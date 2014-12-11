gutil        = require 'gulp-util'
prettyHrtime = require 'pretty-hrtime'

module.exports = (error) ->
	gutil.log [
		(error.name + ' in ' + error.plugin).bold.red.underline,
		'',
		error.message,
		''
	].join '\n'

	# Run with `--beep`
	if gutil.env.beep
		gutil.beep()

	# Keep gulp from hanging on this task
	this.emit 'end'
