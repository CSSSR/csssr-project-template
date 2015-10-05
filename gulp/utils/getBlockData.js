import path from 'path';
import fs   from 'fs';

let getBlockName = () => {
	let err = new Error();
	let str = err.stack.split('at Object.jade_mixins.');
	return str[1].split(' ')[0];
}

let getBlockJSON = (path) => {
	let json = '{}';
	try {
		json = fs.readFileSync(path, 'utf8');
	}
	catch(e) {}
	return JSON.parse(json);
}

module.exports = (dataFile) => {
	let block = getBlockName()

	let pathToData = path.join('.', 'app', 'blocks', block);
	let resolvedPath = path.resolve(pathToData);
	let dataPath = resolvedPath + path.sep;
	let dataFilePath = path.resolve(path.join(dataPath, block + '.json'));

	// if (dataPath != dataFilePath.slice(0, dataPath.length)) {
	// 	throw new Error('Data path is not in data directory. Abort due potential data disclosure.');
	// }
	console.log(dataFilePath);

	return getBlockJSON(dataFilePath); // JSON.parse(fs.readFileSync(dataFilePath, 'utf8') || '{}');
};
