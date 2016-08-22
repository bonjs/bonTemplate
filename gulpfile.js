
var elixir = require('laravel-elixir');
var myJSX = require('./myJSX.js');


var gulp = require('gulp');

var $ = elixir.Plugins;
var config = elixir.config;

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

elixir.extend('test', function(scripts, output, baseDir) {
	
    var paths = prepGulpPaths(scripts, baseDir, output);

    new elixir.Task('test', function() {
    	
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths}   paths
 * @param {object|null} babel
 */
var gulpTask = function(paths, babel) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concat(paths.output.name))
        .pipe($.if(babel, $.babel(babel)))
        .on('error', function(e) {
            new elixir.Notification().error(e, 'Babel Compilation Failed!');
            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(myJSX())
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new elixir.Notification('Scripts Merged!'))
    );
};

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'all.js');
};


elixir(function(mix) {
    mix.test('./src/index.js', './publish/all.js');
});


