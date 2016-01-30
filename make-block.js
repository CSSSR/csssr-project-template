'use strict';

import * as fs from 'fs';
import * as path from 'path';
import {createInterface} from 'readline';
const process = global.process;
const rl = createInterface(process.stdin, process.stdout);

// Папка с блоками
const BLOCKS_DIR = path.join(__dirname, 'app/blocks');

// //////////////////////////////////////////////////////////////////////////////////////////////////

const fileSources = {
// Дефолтный контент файлов нового блока
	jade: `mixin {blockName}()\n  +b.{blockName}&attributes(attributes) Я НОВЫЙ БЛОК {blockName}\n`,
	styl: `.{blockName}\n  background-color {rndColor}\n`
};

function validateBlockName(blockName) {
	return new Promise(function (resolve, reject) {
		const isValid = /^(\d|\w|-)+$/.test(blockName);

		if (isValid) {
			resolve(isValid);
		} else {
			let errMsg = '';
			errMsg += `ERR>>> Ошибка в имени блока ${blockName}\n`;
			errMsg += 'ERR>>> Имя блока должно состоять из букв, цифр и минусов.';
			reject(errMsg);
		}
	});
}

function directoryExist(blockPath, blockName) {
	return new Promise(function (resolve, reject) {
		fs.stat(blockPath, function (notExist) {
			if (notExist) {
				// Блок не найден, значит можно смело создавать новый
				resolve();
			} else {
				reject(`ERR>>> Блок с именем ${blockName} уже существует.`);
			}
		});
	});
}

function createDir(dirPath) {
	return new Promise(function (resolve, reject) {
		fs.mkdir(dirPath, function (err) {
			if (err) {
				reject(`ERR>>> Ошибка при создании директории ${dirPath}`);
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
							reject(`ERR>>> Ошибка при создании файла ${filePath}`);
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
				reject(`ERR>>> Ошибка при получении списка файлов директории ${blockPath}`);
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
				console.log(`Создан блок app/blocks/${blockName}`);
				console.log('-------------------------------------------------');
// Выводим список созданых файлов
				files.forEach(function (file) {
					console.log(file);
				});

// Если добрались до сюда то настало время выходить :)
				rl.close();
			});
}


// //////////////////////////////////////////////////////////////////////////
//
// Начало здесь
//

// Параметры командной строки
const blockNameFromCli = process.argv
		.slice(2)
		// Сливаем все аргументы в один, чтобы ругнулась валидация на пробелы в имени блока
		.join(' ');


// Если передали имя блока в параметрах коммандной
// строки то создаём блок сразу. Иначе - включаем диалоговый режим
if (blockNameFromCli !== '') {
	initMakeBlock(blockNameFromCli)
			.catch(printErrorMessage);
} else {
	rl.setPrompt('Имя блока> ');
	rl.prompt();
	rl
			.on('line', function (line) {
				const blockName = line.trim();

				initMakeBlock(blockName)
						.catch(printErrorMessage);
			});
}
