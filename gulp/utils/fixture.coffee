path = require 'path'
fs   = require 'fs'

exports.get = (datafile) ->

	fixtursPath = (path.resolve (path.join '.', 'app', 'resources', 'fixtures')) + path.sep
	datafilePath = path.resolve path.join fixtursPath, datafile + '.json'

	if fixtursPath != datafilePath.slice 0, fixtursPath.length
		throw new Error 'Fixture path is not in fixtures directory. Abort due potential data disclosure.'

	return JSON.parse fs.readFileSync datafilePath
