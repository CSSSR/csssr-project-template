process.env.NODE_PATH = __dirname + '/app';
require('module').Module._initPaths();
require('require-dir')('tasks', {recurse: true});
