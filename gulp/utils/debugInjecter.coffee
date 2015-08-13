fs = require 'fs'

module.exports = (req, res, next) ->
	url = req.url

	if /(\.html|\/)$/.test url
		if /\/$/.test url
			url = url + 'index.html'

		html = fs.readFileSync('dist/' + url).toString()

		title = (html.match(/<title>(.+)<\/title>/i) || '')[1]

		if title
			title = title.replace /'/g, '\\\''
			title = '\t<script>console.log(\'DEBUG — ' + title + '\');</script>\n\t</head>'
			html = html.replace /<\/head>/i, title

		html = html
				.replace /\t*<link(.+?)?rel="(shortcut )?icon( shortcut)?"(.+?)?>\n?/gi, ''
				.replace /<\/head>/i, '\t<link href="\/debug.ico" rel="icon">\n\t<\/head>'
				.replace /<title>/i, '<title>DEBUG — '

		res.setHeader 'Content-Type', 'text/html'
		res.end html

		return

	next()
