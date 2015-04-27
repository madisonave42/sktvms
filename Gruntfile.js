module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    includes: {
    	test: {
    		cwd:'pub_src/test',
    		src: ['*.html'],
    		dest: 'pub/test',
    		options: {
    			flatten:true,
    			includePath: 'pub_src/_include'
    		}
    	},

			admin: {
				cwd:'pub_src/admin',
				src: ['*.html'],
				dest: 'pub/admin',
				options: {
					flatten:true,
					includePath: 'pub_src/_include'
				}
			},

      log: {
        cwd:'pub_src/log',
        src: ['*.html'],
        dest: 'pub/log',
        options: {
          flatten:true,
          includePath: 'pub_src/_include'
        }
      },

      monitoring: {
        cwd:'pub_src/monitoring',
        src: ['*.html'],
        dest: 'pub/monitoring',
        options: {
          flatten:true,
          includePath: 'pub_src/_include'
        }
      },

      setting: {
        cwd:'pub_src/setting',
        src: ['*.html'],
        dest: 'pub/setting',
        options: {
          flatten:true,
          includePath: 'pub_src/_include'
        }
      },

      stats: {
        cwd:'pub_src/stats',
        src: ['*.html'],
        dest: 'pub/stats',
        options: {
          flatten:true,
          includePath: 'pub_src/_include'
        }
      },

      vnfManagement: {
        cwd:'pub_src/vnf_management',
        src: ['*.html'],
        dest: 'pub/vnf_management',
        options: {
          flatten:true,
          includePath: 'pub_src/_include'
        }
      }
    },

    concat: {
    	dist: {
    		src: ['js_src/*.js'],
    		dest: 'js/function.js'
    	}
    },

    uglify: {
    	build: {
        src: 'js/function.js',
        dest: 'js/function.min.js'
     	}
    },

    sass:{
    	dist: {
    		options: {
    			sourcemap: 'auto',
    			style: 'expanded'
    		},
    		files: [{
    			expand: true,
    			cwd: 'css_scss',
    			src: ['*.scss'],
    			dest: 'css/',
    			ext: '.css'
    		}]
    	}
    },

    connect: {
      server: {
        options: {
          port: 8011,
          hostname: 'localhost',
          base: '.',
          livereload: true,
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        }
      }
    },

    copy: {

    	jsLib: {
    		files:[{
    			expand: true,
    			cwd: 'js_src/lib/',
    			src: ['jquery-1.11.0.min.js', 'jquery-1.11.0.min.map', 'jquery-ui.min.js', 'jquery.selectric.min.js'],
    			dest: 'js/lib/'
    		}]
    	},

    	// output
    	html: {
				files:[{
					expand: true,
					cwd: 'pub/',
					src: ['**', '!**/@tmp.*'],
					dest: '_output/pub/'
				}]
    	},

    	js: {
        files:[{
          expand: true,
          cwd: 'js/',
          src: ['**', '!function.js'],
          dest: '_output/js/'
        }]
    	},

    	css: {
				files:[{
					expand: true,
					cwd: 'css/',
					src: ['**', '!*.map'],
					dest: '_output/css/'
				}]
    	},

    	images: {
    		expand: true,
    		src:'images/**',
    		dest:'_output/'
    	}

    },

    watch: {

    	js: {
    		files: ['js_src/*.js'],
    		tasks: ['concat:dist', 'uglify:build', 'reload'],
    		options: {
      		livereload : true
      	}
    	},

    	html: {
    		files: ['pub_src/**'],
    		tasks: ['includes', 'reload'],
    		options: {
      		livereload : true
      	}
    	},

    	css: {
    		files: ['css_scss/**'],
    		tasks: ['sass', 'reload'],
    		options: {
      		livereload : true
      	}
    	}

    },

    reload: {
    	port: 8011
    }

  });

  grunt.registerTask('default',function(){
  	grunt.log.writeln('Grunt Start...');
  	grunt.task.run([
  		'includes',
  		'concat',
  		'uglify',
  		'sass',
  		'copy:jsLib',
  		'connect',
  		'watch'
  	]);
  });

  grunt.registerTask('export', function(){
	  grunt.task.run([
		  'includes',
		  'concat',
		  'uglify',
		  'sass',
		  'copy'
	  ]);
  });

};
