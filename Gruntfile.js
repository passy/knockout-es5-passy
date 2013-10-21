module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/knockout-es5.js'],
            jshintrc: '.jshintrc'
        },
        concat: {
            dist: {
                src: ['src/knockout-es5.js', 'lib/weakmap.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jasmine_node: {
            specNameMatcher: 'spec',
            projectRoot: '.',
            requirejs: false,
            useHelpers: true,
            forceExit: true
        },
        watch: {
            scripts: {
                files: ['src/*.js', 'spec/*.js'],
                tasks: ['default'],
                options: {
                    nospawn: false,
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jasmine_node']);
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'test', 'build']);

};
