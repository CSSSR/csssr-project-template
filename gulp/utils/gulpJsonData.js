import path         from 'path'
import fs           from 'fs'

let getJSONFileName = (file) => {
	let page = ((path.basename(file.path)).split('.jade'))[0];
	let jsonFilename = './app/pages/'+ page + '/' + page + '.json';

	if (page === 'default') {
		jsonFilename = './app/pages/'+ page + '.json';
	}

	return jsonFilename;
}

let requireJSONAsync = (fileName, cb) => {
	fs.readFile(fileName, (err, data) => {
		cb(err ? {} : JSON.parse(data));
	})
}

let getPromisedJSON = (filename) =>
	new Promise((resolve, reject) => {
		requireJSONAsync(filename, (data) => {
			resolve(data);
		})
	})

let getTmplByJSON = (filename) => {
	let bpName = path.basename(filename, '.json');
	const dirName = path.dirname(filename);
	const tree = dirName.split(path.sep);

	if (bpName !== 'default') {
		bpName = tree[tree.length - 1]; // [block|page]Name
	}

	tree.push(bpName + '.jade');
	return path.join(...tree);
}

module.exports = {
	clearCached: (cached) => {
		return (cb) => {
			if (Boolean(global.changedJSON) === true) {
				let jadeFileName = getTmplByJSON(global.changedJSON);
				let baseName = path.basename(jadeFileName);

				if (baseName === 'default.jade') {
					console.log('clearing all cache');
					delete(cached.caches.jade);

				} else {
					for (let i in cached.caches.jade) {
						if (jadeFileName === i) {
							console.log('clearing cache for ' + jadeFileName);
							delete(cached.caches.jade[jadeFileName]);
						}
					}
				}

				delete(global.changedJSON);
			}
			cb();
		}
	},
	bindData: (defaultData = {}) => {
		return (file, cb) => {
			let json = Object.assign({}, defaultData);
			let promises = [];

			if (file.data) {
				json = Object.assign(file.data, json);
			}

			promises.push(getPromisedJSON(getJSONFileName({path:'default'})));

			let pageType = (((path.basename(file.path)).split('.jade'))[0]);
			let typeParts = pageType.split('-');
			let str = '';

			json.pageType = (((path.basename(file.path)).split('.jade'))[0]);

			for (let i = 0; i < typeParts.length; i++) {
				if (str !== '') {
					str += '-';
				} else {
					json.pageType = typeParts[i];
				}

				str += typeParts[i];
				promises.push(getPromisedJSON(getJSONFileName({path: str})));
			}

			Promise.all(promises).then((data) => {
				for (let i = 0; i < data.length; i++) {
					json = Object.assign(json, data[i]);
				}
				cb(null, json);
			});
		}
	}
}
