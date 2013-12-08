/**
 * @fileOverview
 * grunt commands for grunt-cli that will make your life better!
 *
 * @author areitz
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
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
            }
        },
        htmllint: {
            all: ["src/index.html"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-html');

    // Default task
    grunt.registerTask('default', ['help']);

    grunt.registerTask('help', 'Prints out the specific details of each command', function () {
        console.log("Available Commands");
        console.log("  watch:\tAuto pushes updates to the browser on save");
        console.log("  connect:\tStart a local server for testing on port 8888");
        console.log("  dev:\tRuns all dev commands, if your are developing you want this");
        console.log("  open:dev\tOpens Google Chrome to the index page on port 8888");
    });

    grunt.registerTask('dev', 'Runs all dev commands, if your are developing you want this', 'concurrent:target');
};
