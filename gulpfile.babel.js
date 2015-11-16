process.env.NODE_PATH = __dirname + '/app';
require('module').Module._initPaths();
require('require-dir')('./gulp/tasks', {recurse: true});
