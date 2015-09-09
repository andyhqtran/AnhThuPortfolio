module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      assets: ['assets'],
      css: ['<%= project.assets %>/css'],
      sass: ['<%= project.assets %>/sass'],
      js: ['<%= project.assets %>/js']
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'app',
        }
      }
    },

    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: {
          'index.html': 'index.jade'
        }
      }
    },

    sass: {
      dev: {
        options: {
          sourcemap: 'auto',
          style: 'expanded'
        },
        files: {
          '<%= project.css %>/main.css': '<%= project.sass %>/main.scss'
        }
      }
    },

    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        files: {
          '<%= project.css %>/main.css': '<%= project.css %>/main.css'
        }
      }
    },

    notify: {
      options: {
        title: 'GruntJS'
      },
      server: {
        options: {
          message: 'Server has been initiated.'
        }
      },
      grunt: {
        options: {
          message: 'Gruntfile has been updated.'
        }
      },
      jade: {
        options: {
          message: 'Jade files has been compiled.'
        }
      },
      sass: {
        options: {
          message: 'Sass files has been compiled.'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function (time) {
          grunt.log.writeln('Grunt has finished compiling in ' + time + 'ms!');
          grunt.log.writeln('Awaiting...');
          grunt.log.write('\x07'); // beep!
        },
        event: ['all']
      },

      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['notify:grunt'],
        options: {
          reload: true
        }
      },

      sass: {
        files: '<%= project.assets %>/sass/{,*/,*/*/}*.{scss,sass}',
        tasks: ['sass:dev', 'autoprefixer:dev', 'notify:sass'],
      },

      jade: {
        files: '{,*/,*/*/,*/*/*/}*.jade',
        tasks: ['jade:dev', 'wiredep', 'notify:jade'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', ['connect:server', 'notify:server', 'watch']);
};