module.exports = function (grunt) {
	
	grunt.initConfig({

		sprite: {
			all: {
				src: 'src/img/sprite/*.png',
				destImg: 'src/img/sprite.png',
				cssFormat: 'stylus',
				destCSS: 'src/stylus/sprite.styl',
				algorithm: 'binary-tree',
				padding: 8,
				engine: 'pngsmith',
				imgOpts: {
					format: 'png'
				}
			}
		},

		imagemin: {
			options: {
				optimizationLevel: 1,
				pngquant: true,
				progressive: false,
				interlaced: false
			},
			images: {
				files: [{
					expand: true,
					cwd: 'src/img/',
					src: ['**/*.{png,jpg,gif}', '!sprite/*'],
					dest: 'public/img/'
				}]
			}
		},

		stylus: {
			compile: {
				files: [{
					cwd: 'src/stylus',
					src: 'main.styl',
					dest: 'public/css',
					expand: true,
					ext: '.min.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'ie 9',
					'ff 3.5',
					'opera 11',
					'safari 5',
					'chrome 7',
					'android 4',
					'ios 5'
				]
			},
			main: {
				src: 'public/css/main.min.css'
			}
		},

		cssmin: {
			combine: {
				files: {
					'public/css/main.min.css': 'public/css/main.min.css'
				}
			}
		},

		jade: {
			compile: {
				files: [{
					cwd: 'src',
					src: ['**/*.jade', '!inc/**/*.jade'],
					dest: 'public',
					expand: true,
					ext: '.html'
				}]
			}
		},
		
		concat: {
			options: {
				separator: ';'
			},
			public: {
				files: [{
					src: [
						'src/js/libs/jquery-2.1.0.min.js',
						'src/js/libs/**/*.js',
						'src/js/main.js'
					],
					dest: 'public/js/main.min.js'
				}]
			}
		},

		uglify: {
			options: {
				report: 'min'
			},
			build: {
				src: 'public/js/main.min.js',
				dest: 'public/js/main.min.js'
			}
		},

		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: 'src/fonts/',
					src: '*',
					dest: 'public/fonts/',
					filter: 'isFile'
				}]
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					base: 'public'
				}
			}
		},

		watch: {
			sprite: {
				files: ['src/img/sprite/*.png'],
				tasks: ['sprite']
			},
			imagemin: {
				files: ['src/img/**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			},
			stylus: {
				files: ['src/stylus/**/*.styl'],
				tasks: ['stylus', 'autoprefixer', 'cssmin']
			},
			jade: {
				files: ['src/**/*.jade', '!inc/**/*.jade'],
				tasks: ['jade']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['concat', 'uglify']
			},
			copy: {
				files: ['src/fonts/**/*'],
				tasks: ['copy:fonts']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: ['public/**/*']
			}
		}

	});

	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'sprite',
		'imagemin',
		'stylus',
		'autoprefixer',
		'cssmin',
		'jade',
		'concat',
		'uglify',
		'copy',
		'connect',
		'watch'
	]);
};