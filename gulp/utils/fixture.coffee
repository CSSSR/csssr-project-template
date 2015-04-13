exports.get = (datafile) ->
	path = require 'path'
	fs = require 'fs'

	fixtursPath = (path.resolve (path.join '.', 'app', 'resources', 'fixtures')) + path.sep
	datafilePath = path.resolve path.join fixtursPath, datafile + '.json'

	if fixtursPath != datafilePath.slice 0, fixtursPath.length
		throw new Error 'Fixture path is not in fixtures directory. Abort due potential data disclosing.'

	return JSON.parse fs.readFileSync datafilePath
