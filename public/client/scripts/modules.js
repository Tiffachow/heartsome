global.jQuery = require('jquery');
global.$ = global.jQuery;
global.Tether = require('tether');
global._ = require('underscore');
require('../../../node_modules/bootstrap/dist/js/bootstrap.min.js');
require('../../../node_modules/bootstrap-markdown/js/bootstrap-markdown.js');
global.markdown = require('markdown');

// Polyfill(s) for older browsers
require('../../../node_modules/core-js/client/shim.min.js');
require('../../../node_modules/zone.js/dist/zone.js');
require('../../../node_modules/reflect-metadata/Reflect.js');

require('../../../node_modules/systemjs/dist/system.src.js');

// Semantic UI
require('../../semantic/dist/semantic.min.js');

// paths serve as alias
var paths = {
    'npm:':                              '../../../node_modules/'
};

// map tells the System loader where to look for things

var map = {
    'app':                               '../../dist/app',
    // angular bundles
    '@angular/core':                     'npm:@angular/core/bundles/core.umd.js',
    '@angular/common':                   'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler':                 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser':         'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http':                     'npm:@angular/http/bundles/http.umd.js',
    '@angular/router':                   'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms':                    'npm:@angular/forms/bundles/forms.umd.js',
    // other libraries
    'rxjs':                              'npm:rxjs'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app':                        { main: './main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' }
};

var config = {
    paths: paths,
    map: map,
    packages: packages
}

System.config(config);

System.import("app")
    .catch(console.error.bind(console));

module.exports = function () { };