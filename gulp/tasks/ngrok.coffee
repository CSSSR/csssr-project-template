gulp  = require 'gulp'
gutil = require 'gulp-util'
ngrok = require 'ngrok'

gulp.task 'ngrok', ->
	port = gutil.env.port || 3001

	ngrok.connect port, (err, url) ->
		gutil.log [
				'[ngrok] '.bold.green,
				url.bold.magenta.underline,
				' -> 127.0.0.1:' + port
			].join ''
