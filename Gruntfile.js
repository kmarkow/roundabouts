module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "src/roundabouts.js": "src/app.js",
                    "src/cli_measure_island_diameter.js": "src/measure_island_diameter.js",
                    "src/cli_measure_rules.js": "src/measure_rules.js",
                    "src/cli_measure_truck_ratio.js": "src/measure_truck_ratio.js"
                }
            }
        },
        copy: {
            main: {
                files: [
                    //  Copy node dependencies to public
                    {expand: true, flatten: true, src: ["node_modules/two.js/build/two.js"], dest: "public/js/", filter: 'isFile'},
                    // Copy HTMLs
                    {expand: true, flatten: true, src: ["src/GUI/**/*.html"], dest: "public/", filter: 'isFile'},
                    // Copy roundabouts.js build file - the whole application without external libraries dependencies
                    {expand: true, flatten: true, src: ["src/roundabouts.js"], dest: "public/js/", filter: 'isFile'}
                ]
            }
        },
        watch: {
            scripts: {
                files: [
                        "src/**/*.js",
                        "!src/roundabouts.js",
                        "!src/cli*"
                    ],
                tasks: ["build"]
            },
            html: {
                files: "src/**/*.html",
                tasks: ["build"]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask("build", ["browserify", "copy"]);
    grunt.registerTask("tests", ["karma"]);
};
