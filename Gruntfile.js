module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "public/js/roundabouts.js": "src/app.js"
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    "expand": true,
                    "cwd": "src/",
                    "src": ["**/*.html"],
                    "dest": "public/js/",
                    "ext": ".html"
                }]
            }
        },
        watch: {
            scripts: {
                files: "src/*.js",
                tasks: ["browserify"]
            },
            html: {
                files: "src/*.html",
                tasks: ["htmlmin"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");

    grunt.registerTask("default", ["browserify", "htmlmin"]);
};