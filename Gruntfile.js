/**
 * @fileOverview
 * grunt commands for grunt-cli that will make your life better!
 *
 * @author areitz
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            livereload: {
                files: ['src/index.html'],
                tasks: 'htmllint',
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    base: 'src',
                    keepalive: true,
                    hostname: '127.0.0.1',
                    livereload: true
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['connect', 'watch', 'open:dev'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:8888',
                app: 'google-chrome'
            },
            release: {
                path: 'dist/index.html',
                app: 'google-chrome'
            }
        },
        htmllint: {
            all: ["src/index.html"]
        },
        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        clean: {
            build: ["dist"]
        },
        bumpup: {
            files: ['package.json', 'bower.json']
        },
        copy: {
            release: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            }
        },
        html_minify: {
            options: {
            },
            release: {
                files: [
                    {
                        src: ['dist/index.html'],
                        dest: 'dist/index.html'
                    }
                ]
            }
        },
        'gh-pages': {
            options: {
              base: 'dist'
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-html-minify');
    grunt.loadNpmTasks('grunt-gh-pages');


    // Default task
    grunt.registerTask('default', ['help']);

    grunt.registerTask('help', 'Prints out the specific details of each command', function () {
        console.log("Available Commands");
        console.log("  watch:\tAuto pushes updates to the browser on save");
        console.log("  connect:\tStart a local server for testing on port 8888");
        console.log("  dev:\tRuns all dev commands, if your are developing you want this");
        console.log("  open:dev\tOpens Google Chrome to the index page on port 8888");
        console.log("  open:release\tOpens the release html file");
        console.log("  build\tCreates the release file in the dist folder");
    });

    grunt.registerTask('dev', 'Runs all dev commands, if your are developing you want this', 'concurrent:target');

    grunt.registerTask('build', 'Creates the release file in the dist folder',
        [
            'copy:release',
            'imagemin',
            'html_minify',
            'bumpup'
        ]
    );

    grunt.registerTask('release', 'Runs build and then publishes it to github pages',
        [
            'build',
            'gh-pages'
        ]
    );
};
