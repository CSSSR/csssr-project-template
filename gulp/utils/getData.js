import path from 'path';
import fs   from 'fs';

module.exports = (dataFile) => {
	let pathToData = path.join('.', 'app', 'data');
	let resolvedPath = path.resolve(pathToData);
	let dataPath = resolvedPath + path.sep;
	let dataFilePath = path.resolve(path.join(dataPath, /\.json$/.test(dataFile) && dataFile || dataFile + '.json'));

	if (dataPath != dataFilePath.slice(0, dataPath.length)) {
		throw new Error('Data path is not in data directory. Abort due potential data disclosure.');
	}

	return JSON.parse(fs.readFileSync(dataFilePath));
};
