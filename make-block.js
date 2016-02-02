'use strict';

import * as fs from 'fs';
import * as path from 'path';
import {createInterface} from 'readline';
const process = global.process;
const rl = createInterface(process.stdin, process.stdout);

// folder with all blocks
const BLOCKS_DIR = path.join(__dirname, 'app/blocks');

// //////////////////////////////////////////////////////////////////////////////////////////////////

// default content for files in new block
const fileSources = {
	jade: `mixin {blockName}()\n  +b.{blockName}&attributes(attributes) I AM NEW BLOCK {blockName}\n`,
	styl: `.{blockName}\n  background-color {rndColor}\n`
};

function validateBlockName(blockName) {
	return new Promise(function (resolve, reject) {
		const isValid = /^(\d|\w|-)+$/.test(blockName);

		if (isValid) {
			resolve(isValid);
		} else {
			let errMsg = '';
			errMsg += `ERR>>> Incorrect block name ${blockName}\n`;
			errMsg += 'ERR>>> Block name must include letters, numbers & the minus symbol.';
			reject(errMsg);
		}
	});
}

function directoryExist(blockPath, blockName) {
	return new Promise(function (resolve, reject) {
		fs.stat(blockPath, function (notExist) {
			if (notExist) {
				resolve();
			} else {
				reject(`ERR>>> The block ${blockName} already exists.`);
			}
		});
	});
}

function createDir(dirPath) {
	return new Promise(function (resolve, reject) {
		fs.mkdir(dirPath, function (err) {
			if (err) {
				reject(`ERR>>> Failed to create folder ${dirPath}`);
			} else {
				resolve();
			}
		});
	});
}

function createFiles(blocksPath, blockName) {
	const promises = [];
	Object.keys(fileSources).forEach(function (ext) {
		const rndColor = '#' + Math.random().toString(16).slice(-3);
		const fileSource = fileSources[ext]
				.replace(/\{blockName}/g, blockName)
				.replace('{rndColor}', rndColor);
		const filename = `${blockName}.${ext}`;
		const filePath = path.join(blocksPath, filename);

		promises.push(
				new Promise(function (resolve, reject) {
					fs.writeFile(filePath, fileSource, 'utf8', function (err) {
						if (err) {
							reject(`ERR>>> Failed to create file ${filePath}`);
						} else {
							resolve();
						}
					});
				})
		);
	});

	return Promise.all(promises);
}

function getFiles(blockPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(blockPath, function (err, files) {
			if (err) {
				reject(`ERR>>> Failed to get file list from folder ${blockPath}`);
			} else {
				resolve(files);
			}
		});
	});
}

function printErrorMessage(errText) {
	console.log(errText);
	rl.close();
}

// //////////////////////////////////////////////////////////////////////////

function initMakeBlock(blockName) {
	const blockPath = path.join(BLOCKS_DIR, blockName);

	return validateBlockName(blockName)
			.then(() => directoryExist(blockPath, blockName))
			.then(() => createDir(blockPath))
			.then(() => createFiles(blockPath, blockName))
			.then(() => getFiles(blockPath))
			.then(function (files) {
				console.log('-------------------------------------------------');
				console.log(`The block has just been created in app/blocks/${blockName}`);
				console.log('-------------------------------------------------');

				// Displays a list of files created
				files.forEach(function (file) {
					console.log(file);
				});

				rl.close();
			});
}


// //////////////////////////////////////////////////////////////////////////
//
// Start here
//

// Command line arguments
const blockNameFromCli = process.argv
		.slice(2)
		// join all arguments to one string (to simplify the capture user input errors)
		.join(' ');


// If the user pass the name of the block in the command-line options
// that create a block. Otherwise - activates interactive mode
if (blockNameFromCli !== '') {
	initMakeBlock(blockNameFromCli)
			.catch(printErrorMessage);
} else {
	rl.setPrompt('block-name> ');
	rl.prompt();
	rl
			.on('line', function (line) {
				const blockName = line.trim();

				initMakeBlock(blockName)
						.catch(printErrorMessage);
			});
}
