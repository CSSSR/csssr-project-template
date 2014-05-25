module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: ['dist']
		},

		sprite: {
			all: {
				src: 'app/images/sprite/**/*.png',
				destImg: 'app/images/sprite.png',
				cssFormat: 'stylus',
				destCSS: 'app/styles/sprite.styl',
				algorithm: 'binary-tree',
				padding: 4,
				engine: 'pngsmith',
				imgOpts: {
					format: 'png'
				}
			}
		},

		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: 'app/images',
					src: ['**/*.{png,jpg,gif}', '!sprite/**/*'],
					dest: 'dist/images'
				}]
			}
		},

		stylus: {
			options: {
				compress: false
			},
			compile: {
				files: [{
					cwd: 'app/styles',
					src: 'main.styl',
					dest: 'dist/styles',
					expand: true,
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'ie 9',
					'ff 27',
					'opera 12',
					'safari 6',
					'chrome 32',
					'android 4',
					'ios 5'
				]
			},
			all: {
				src: ['dist/styles/**/*.css']
			}
		},

		cssbeautifier: {
			files: 'dist/styles/**/*.css'
		},

		jade: {
			dist: {
				options: {
					data: {
						page: {
							title: '<%= pkg.title %>',
							description: '<%= pkg.description %>',
							keywords: '<%= pkg.keywords.join(\', \') %>',
							copyright: '<%= pkg.copyright %>',
							replyTo: '<%= pkg.bugs.email %>'
						}
					}
				},
				files: [{
					cwd: 'app/templates',
					src: ['**/*.jade', '!partials/**/*'],
					dest: 'dist',
					expand: true,
					ext: '.html'
				}]
			}
		},

		prettify: {
			options: {
				brace_style: 'expand',
				indent: 1,
				indent_char: '	',
				condense: true,
				indent_inner_html: true
			},
			all: {
				expand: true,
				cwd: 'dist',
				ext: '.html',
				src: ['**/*.html'],
				dest: 'dist'
			},
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				force: true,
				globals: {
					jQuery: true
				}
			},
			all: [
				'Gruntfile.js',
				'app/scripts/**/*.js',
				'!app/scripts/libs/**/*'
			]
		},

		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: 'app/fonts',
					src: '*',
					dest: 'dist/fonts',
					filter: 'isFile'
				}]
			},
			scripts: {
				files: [{
					expand: true,
					cwd: 'app/scripts',
					src: '**/*.js',
					dest: 'dist/scripts',
					filter: 'isFile'
				}]
			},
			svg: {
				files: [{
					expand: true,
					cwd: 'app/images/svg',
					src: '**/*.svg',
					dest: 'dist/images',
					filter: 'isFile'
				}]
			},
			favicon: {
				files: [{
					expand: true,
					cwd: 'src',
					src: 'favicon.ico',
					dest: 'dist',
					filter: 'isFile'
				}]
			}
		},

		connect: {
			dist: {
				options: {
					port: 3000,
					base: 'dist'
				}
			}
		},

		watch: {
			sprite: {
				files: ['app/images/sprite/**/*.png'],
				tasks: ['sprite']
			},
			imagemin: {
				files: ['app/images/**/*.{png,jpg,gif}', '!app/images/sprite/**/*'],
				tasks: ['newer:imagemin']
			},
			stylus: {
				files: ['app/styles/**/*.styl'],
				tasks: ['stylus', 'autoprefixer', 'cssbeautifier']
			},
			jade: {
				files: ['app/templates/**/*.jade', '!app/templates/partials/**/*'],
				tasks: ['newer:jade', 'newer:prettify']
			},
			jadePartials: {
				files: ['app/templates/partials/**/*.jade'],
				tasks: ['jade', 'prettify']
			},
			scripts: {
				files: ['app/scripts/**/*.js'],
				tasks: ['jshint', 'copy:scripts']
			},
			copyFonts: {
				files: ['app/fonts/**/*'],
				tasks: ['newer:copy:fonts']
			},
			copySvg: {
				files: ['app/images/svg/**/*.svg'],
				tasks: ['newer:copy:svg']
			},
			copyFavicon: {
				files: ['app/favicon.ico'],
				tasks: ['copy:favicon']
			},
			grunt: {
				files: 'Gruntfile.js'
			}
		}

	});

	grunt.registerTask('build', [
		'clean:dist',
		'sprite',
		'imagemin',
		'stylus',
		'autoprefixer',
		'cssbeautifier',
		'jade',
		'prettify',
		'jshint',
		'copy'
	]);

	grunt.registerTask('serve', [
		'connect:dist:keepalive'
	]);

	grunt.registerTask('default', [
		'build',
		'connect:dist',
		'watch'
	]);

};
