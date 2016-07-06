global.jQuery = require('jquery');
global.$ = global.jQuery;
global.Tether = require('tether');
global._ = require('underscore');
require('../../../node_modules/bootstrap/dist/js/bootstrap.min.js');

// Polyfill(s) for older browsers
require('../../../node_modules/core-js/client/shim.min.js');
require('../../../node_modules/zone.js/dist/zone.js');
require('../../../node_modules/reflect-metadata/Reflect.js');

require('../../../node_modules/systemjs/dist/system.src.js');

// map tells the System loader where to look for things
var map = {
    'app':                        '../../dist/app',
    '@angular':                   '../../../node_modules/@angular',
    'rxjs':                       '../../../node_modules/rxjs',
    '@angular/router':            '../../../node_modules/@angular/router'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app':                        { main: './app.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    '@angular/router':            { main: './index.js',  defaultExtension: 'js' },
};

var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    // 'router',
    'router-deprecated',
    'upgrade',
];

// Individual files (~300 requests):
function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
}
// Bundled (~40 requests):
function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
}
// Most environments should use UMD; some (Karma) need the individual index files
var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
// Add package entries for angular packages
ngPackageNames.forEach(setPackageConfig);


var config = {
    map: map,
    packages: packages
}

System.config(config);

System.import("app")
    .catch(console.error.bind(console));

module.exports = function () { };