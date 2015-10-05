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

module.exports = (blockDataType) => {
	let blockName = getBlockName();

	let pathToData = path.join('.', 'app', 'blocks', blockName);
	let resolvedPath = path.resolve(pathToData);
	let dataPath = resolvedPath + path.sep;
	let dataFile = (blockDataType || blockName) + '.json';
	let dataFilePath = path.resolve(path.join(dataPath, dataFile));

	return getBlockJSON(dataFilePath);
};
