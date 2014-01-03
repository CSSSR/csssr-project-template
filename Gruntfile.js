module.exports = function (grunt) {
	
	grunt.initConfig({
		
		concat: {
			dist: {
				src: [
					'src/js/libs/jquery-2.0.3.min.js',
					'src/js/main.js'
				],
				dest: 'dest/js/main.min.js'
			}
		},

		uglify: {
			build: {
				src: 'dest/js/main.min.js',
				dest: 'dest/js/main.min.js'
			}
		},

		jade: {
			compile: {
				files: [{
					cwd: 'src',
					src: ['**/*.jade', '!inc/**/*.jade'],
					dest: 'dest',
					expand: true,
					ext: '.html'
				}]
			}
		},

		stylus: {
			compile: {
				files: [{
					cwd: 'src/styl',
					src: 'main.styl',
					dest: 'dest/css',
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
				src: 'dest/css/main.min.css'
			}
		},

		cssmin: {
			combine: {
				files: {
					'dest/css/main.min.css': 'dest/css/main.min.css'
				}
			}
		},

		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: 'src/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dest/img/'
				}]
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					base: 'dest'
				}
			}
		},

		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['dest/**/*']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['concat', 'uglify']
			},
			jade: {
				files: ['src/**/*.jade', '!inc/**/*.jade'],
				tasks: ['jade']
			},
			stylus: {
				files: ['src/styl/**/*.styl'],
				tasks: ['stylus', 'autoprefixer', 'cssmin']
			},
			imagemin: {
				files: ['src/img/**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'concat',
		'uglify',
		'jade',
		'stylus',
		'autoprefixer',
		'cssmin',
		'imagemin',
		'connect',
		'watch'
	]);
};