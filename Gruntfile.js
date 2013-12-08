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
        smoosher: {
            all: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
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
                files: [
                    {src: ['src/lib/reveal.js/lib/js/classList.js'], dest: 'dist/lib/reveal.js/lib/js/classList.js'},
                    {src: ['src/lib/reveal.js/plugin/highlight/highlight.js'], dest: 'dist/lib/reveal.js/plugin/highlight/highlight.js'},
                    {src: ['src/lib/reveal.js/css/print/paper.css'], dest: 'dist/lib/reveal.js/css/print/paper.css'},
                    {src: ['src/lib/reveal.js/css/print/pdf.css'], dest: 'dist/lib/reveal.js/css/print/pdf.css'}
                ]
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
    grunt.loadNpmTasks('grunt-html-smoosher');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-html-minify');


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
            'smoosher',
            'imagemin',
            'html_minify',
            'bumpup'
        ]
    );
};
