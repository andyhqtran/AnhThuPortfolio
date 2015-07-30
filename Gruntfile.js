module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
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
      dist: {
        options: {
          sourcemap: 'auto',
          style: 'compact'
        },
        files: {
          'assets/css/main.css': 'assets/stylesheets/main.scss'
        }
      }
    },
    watch: {
      jade: {
        files: ['*.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      sass: {
        files: ['assets/stylesheets/*.scss', 'assets/stylesheets/*/*.scss'],
        tasks: ['sass'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jade', 'sass', 'watch']);
};
