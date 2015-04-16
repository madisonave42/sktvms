module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    includes: {
    	html: {
    		cwd:'html_src',
    		src: ['*.html'],
    		dest: 'html/',
    		options: {
    			flatten:true,
    			includePath: 'html_src/include'
    		}
    	}
    },
    
    concat: {
    	dist: {
    		src: ['js_src/*.js'],
    		dest: 'js_concat/function.js'
    	}
    	
    	//distLib: {
    	//	src: [
    	//	      'js_src/lib/jquery-1.11.0.min.js',
    	//	      'js_src/lib/jquery-ui-1.11.2.min.js',
			//				'js_src/lib/jquery.slides.min.js',
			//				'js_src/lib/jquery.mousewheel.min.js',
    	//	      '!js_src/lib/html5shiv.min.js',
    	//	      '!js_src/lib/IE9.js'
    	//	      ],
    		      
    	//	dest: 'js_concat/lib/jquery.library.js'
    	//}
    },
    
    uglify: {
    	build: {
        src: 'js_concat/function.js',
        dest: 'js/function.min.js'
     	}
    
	    //buildLib: {
			//	src: 'js_concat/lib/jquery.library.js',
	    //  dest: 'js/lib/jquery.library.min.js'
	   	//}
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
    			src: ['html5shiv.min.js', 'IE9.js', 'jquery-1.11.0.min.map'],
    			dest: 'js/lib/'
    		}]

    	},
    	
    	// output
    	html: {
    		expand:true,
    		src:'html/*.html',
    		dest:'_output/'
    	},
    	js: {
    		expand: true,
    		src:'js/**',
    		dest:'_output/'
    	},
    	css: {
				expand: true,
				src:'css/*.css',
				dest: '_output/',
				options:{
					process: function(content){
						return content.replace('/*# sourceMappingURL=style.css.map */', '');
					}
				}
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
    		files: ['html_src/**'],
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
