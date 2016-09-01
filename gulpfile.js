'use strict';

var 
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less'),
	uglifycss = require('gulp-uglifycss'),
	browserify = require('gulp-browserify'),
	typescript = require('gulp-tsc'),
	rename = require('gulp-rename'),
	typedoc = require('gulp-typedoc'),
	jasmine = require('gulp-jasmine'),
	del = require('del'),
	path = require('path'),
	watch = require('./public/semantic/tasks/watch'),
	build = require('./public/semantic/tasks/build')
;

var paths = {
  client: {
  	scripts: './public/client/scripts/**/*',
  	images: './public/client/images/**/*',
  	fonts: './public/client/fonts/**/*',
  	stylesheets: {
  		less: './public/client/stylesheets/**/*.less',
  		css: './public/client/stylesheets/**/*.css',
  	},
  	angular: ['./public/client/app/**/*.ts', './public/client/app/components/**/*.ts', './public/client/app/services/*.ts']
  },
  dist: './public/dist/'
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
	// You can use multiple globbing patterns as you would with `gulp.src`
	return del([paths.dist]);
});

gulp.task("typedoc", function() {
    return gulp.src(["./public/client/app/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "./public/docs/",
            name: "Heartsome v2"
        }))
    ;
});

gulp.task("test", function() {
	gulp.src('./specs/test.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it
		.pipe(jasmine())
});

gulp.task('bundle:browserify', function() { //for cjs, amd
	return gulp.src('./public/client/scripts/modules.js')
		.pipe(sourcemaps.init())
		.pipe(browserify({
			insertGlobals : true
		}))
		.pipe(rename('bundle.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/client/scripts/'));
});

gulp.task('scripts', ['bundle:browserify'], function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src([paths.client.scripts, '!./public/client/scripts/modules.js'])
		// .pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist + 'scripts'));
});

// Copy all static images
gulp.task('images', function() {
	return gulp.src(paths.client.images)
		// Pass in options to the task
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(paths.dist + 'images'));
});

gulp.task('compile:less', function () {
	return gulp.src(paths.client.stylesheets.less)
		.pipe(less())
		.pipe(gulp.dest('./public/client/stylesheets/css'));
});

gulp.task('styles', ['compile:less'], function () {
	return gulp.src(['./public/semantic/dist/semantic.min.css', paths.client.stylesheets.css, './public/client/stylesheets/main.css'])
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest(paths.dist + 'stylesheets'));
});

gulp.task('copy:fonts', function() {
	return gulp.src(paths.client.fonts)
		.pipe(gulp.dest(paths.dist + 'fonts'));
});

gulp.task('copy:semantic-assets', function() {
	return gulp.src('./public/semantic/dist/themes/default/assets/**/*')
		.pipe(gulp.dest(paths.dist + 'stylesheets/themes/default/assets'));
});

gulp.task('compile:tsc', function(){
	gulp.src(paths.client.angular)
		.pipe(typescript({
			"target": "ES6",
			"module": "commonjs",
			"moduleResolution": "node",
			"sourceMap": true,
			"emitDecoratorMetadata": true,
			"experimentalDecorators": true,
			"removeComments": false,
			"noImplicitAny": false,
			"emitError": false
		}))
		.pipe(gulp.dest(paths.dist + 'app'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch([paths.client.scripts, '!./public/client/scripts/bundle.js'], ['scripts']);
	gulp.watch(paths.client.images, ['images']);
	gulp.watch(paths.client.stylesheets.less, ['styles']);
	gulp.watch(paths.client.angular, ['compile:tsc']);
});

gulp.task('watch semantic', watch);
gulp.task('build semantic', build);

// The default task (called when you run `gulp` from cli)
//  clean && watch
gulp.task('default', ['scripts', 'images', 'styles', 'copy:fonts', 'copy:semantic-assets', 'compile:tsc']);

