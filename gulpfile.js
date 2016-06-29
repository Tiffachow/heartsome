'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var uglifycss = require('gulp-uglifycss');
var browserify = require('gulp-browserify');
var rollup = require('gulp-rollup');
var typescript = require('gulp-tsc');
var rename = require('gulp-rename');
var typedoc = require('gulp-typedoc');
var jasmine = require('gulp-jasmine');
var del = require('del');
var path = require('path');

var paths = {
  client: {
  	scripts: './public/client/scripts/**/*',
  	images: './public/client/images/**/*',
  	fonts: './public/client/fonts/**/*',
  	stylesheets: {
  		less: './public/client/stylesheets/*.less',
  		css: './public/client/stylesheets/*.css',
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

gulp.task('bundle:browserify', function() {
	return gulp.src('./public/client/scripts/modules.js')
		.pipe(sourcemaps.init())
		.pipe(browserify({
			insertGlobals : true
		}))
		.pipe(rename('bundle.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/client/scripts/'));
});

gulp.task('bundle:rollup', function() {
	return gulp.src('./public/client/scripts/modules.js')
		.pipe(sourcemaps.init())
		.pipe(rollup())
		.pipe(rename('bundle.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/client/scripts/'));
});

gulp.task('scripts', ['bundle:rollup'], function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src([paths.client.scripts, '!./public/client/scripts/modules.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
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
		.pipe(gulp.dest('./public/client/stylesheets'));
});

gulp.task('styles', ['compile:less'], function () {
	return gulp.src(paths.client.stylesheets.css)
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

gulp.task('compile:tsc', function(){
	gulp.src(paths.client.angular)
		.pipe(typescript({
			"target": "ES5",
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

// The default task (called when you run `gulp` from cli)
//  clean && watch
gulp.task('default', ['scripts', 'images', 'styles', 'copy:fonts', 'compile:tsc']);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// import path from 'path';
// import gulp from 'gulp';
// import del from 'del';
// import runSequence from 'run-sequence';
// import browserSync from 'browser-sync';
// import swPrecache from 'sw-precache';
// import gulpLoadPlugins from 'gulp-load-plugins';
// import {output as pagespeed} from 'psi';
// import pkg from './package.json';

// const $ = gulpLoadPlugins();
// const reload = browserSync.reload;

// // Lint JavaScript
// gulp.task('lint', () =>
//   gulp.src('app/scripts/**/*.js')
//     .pipe($.eslint())
//     .pipe($.eslint.format())
//     .pipe($.if(!browserSync.active, $.eslint.failOnError()))
// );

// // Optimize images
// gulp.task('images', () =>
//   gulp.src('app/images/**/*')
//     .pipe($.cache($.imagemin({
//       progressive: true,
//       interlaced: true
//     })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe($.size({title: 'images'}))
// );

// // Copy all files at the root level (app)
// gulp.task('copy', () =>
//   gulp.src([
//     'app/*',
//     '!app/*.html',
//     'node_modules/apache-server-configs/dist/.htaccess'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'copy'}))
// );

// // Compile and automatically prefix stylesheets
// gulp.task('styles', () => {
//   const AUTOPREFIXER_BROWSERS = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

//   // For best performance, don't add Sass partials to `gulp.src`
//   return gulp.src([
//     'app/styles/**/*.scss',
//     'app/styles/**/*.css'
//   ])
//     .pipe($.newer('.tmp/styles'))
//     .pipe($.sourcemaps.init())
//     .pipe($.sass({
//       precision: 10
//     }).on('error', $.sass.logError))
//     .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe(gulp.dest('.tmp/styles'))
//     // Concatenate and minify styles
//     .pipe($.if('*.css', $.cssnano()))
//     .pipe($.size({title: 'styles'}))
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('dist/styles'));
// });

// // Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// // to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// // `.babelrc` file.
// gulp.task('scripts', () =>
//     gulp.src([
//       // Note: Since we are not using useref in the scripts build pipeline,
//       //       you need to explicitly list your scripts here in the right order
//       //       to be correctly concatenated
//       './app/scripts/main.js'
//       // Other scripts
//     ])
//       .pipe($.newer('.tmp/scripts'))
//       .pipe($.sourcemaps.init())
//       .pipe($.babel())
//       .pipe($.sourcemaps.write())
//       .pipe(gulp.dest('.tmp/scripts'))
//       .pipe($.concat('main.min.js'))
//       .pipe($.uglify({preserveComments: 'some'}))
//       // Output files
//       .pipe($.size({title: 'scripts'}))
//       .pipe($.sourcemaps.write('.'))
//       .pipe(gulp.dest('dist/scripts'))
// );

// // Scan your HTML for assets & optimize them
// gulp.task('html', () => {
//   return gulp.src('app/**/*.html')
//     .pipe($.useref({
//       searchPath: '{.tmp,app}',
//       noAssets: true
//     }))

//     // Minify any HTML
//     .pipe($.if('*.html', $.htmlmin({
//       removeComments: true,
//       collapseWhitespace: true,
//       collapseBooleanAttributes: true,
//       removeAttributeQuotes: true,
//       removeRedundantAttributes: true,
//       removeEmptyAttributes: true,
//       removeScriptTypeAttributes: true,
//       removeStyleLinkTypeAttributes: true,
//       removeOptionalTags: true
//     })))
//     // Output files
//     .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
//     .pipe(gulp.dest('dist'));
// });

// // Clean output directory
// gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// // Watch files for changes & reload
// gulp.task('serve', ['scripts', 'styles'], () => {
//   browserSync({
//     notify: false,
//     // Customize the Browsersync console logging prefix
//     logPrefix: 'WSK',
//     // Allow scroll syncing across breakpoints
//     scrollElementMapping: ['main', '.mdl-layout'],
//     // Run as an https by uncommenting 'https: true'
//     // Note: this uses an unsigned certificate which on first access
//     //       will present a certificate warning in the browser.
//     // https: true,
//     server: ['.tmp', 'app'],
//     port: 3000
//   });

//   gulp.watch(['app/**/*.html'], reload);
//   gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
//   gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
//   gulp.watch(['app/images/**/*'], reload);
// });

// // Build and serve the output from the dist build
// gulp.task('serve:dist', ['default'], () =>
//   browserSync({
//     notify: false,
//     logPrefix: 'WSK',
//     // Allow scroll syncing across breakpoints
//     scrollElementMapping: ['main', '.mdl-layout'],
//     // Run as an https by uncommenting 'https: true'
//     // Note: this uses an unsigned certificate which on first access
//     //       will present a certificate warning in the browser.
//     // https: true,
//     server: 'dist',
//     port: 3001
//   })
// );

// // Build production files, the default task
// gulp.task('default', ['clean'], cb =>
//   runSequence(
//     'styles',
//     ['lint', 'html', 'scripts', 'images', 'copy'],
//     'generate-service-worker',
//     cb
//   )
// );

// // Run PageSpeed Insights
// gulp.task('pagespeed', cb =>
//   // Update the below URL to the public URL of your site
//   pagespeed('example.com', {
//     strategy: 'mobile'
//     // By default we use the PageSpeed Insights free (no API key) tier.
//     // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
//     // key: 'YOUR_API_KEY'
//   }, cb)
// );

// // Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
// gulp.task('copy-sw-scripts', () => {
//   return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
//     .pipe(gulp.dest('dist/scripts/sw'));
// });

// // See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// // an in-depth explanation of what service workers are and why you should care.
// // Generate a service worker file that will provide offline functionality for
// // local resources. This should only be done for the 'dist' directory, to allow
// // live reload to work as expected when serving from the 'app' directory.
// gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
//   const rootDir = 'dist';
//   const filepath = path.join(rootDir, 'service-worker.js');

//   return swPrecache.write(filepath, {
//     // Used to avoid cache conflicts when serving on localhost.
//     cacheId: pkg.name || 'web-starter-kit',
//     // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
//     importScripts: [
//       'scripts/sw/sw-toolbox.js',
//       'scripts/sw/runtime-caching.js'
//     ],
//     staticFileGlobs: [
//       // Add/remove glob patterns to match your directory setup.
//       `${rootDir}/images/**/*`,
//       `${rootDir}/scripts/**/*.js`,
//       `${rootDir}/styles/**/*.css`,
//       `${rootDir}/*.{html,json}`
//     ],
//     // Translates a static file path to the relative URL that it's served from.
//     // This is '/' rather than path.sep because the paths returned from
//     // glob always use '/'.
//     stripPrefix: rootDir + '/'
//   });
// });

// // Load custom tasks from the `tasks` directory
// // Run: `npm install --save-dev require-dir` from the command-line
// // try { require('require-dir')('tasks'); } catch (err) { console.error(err); }