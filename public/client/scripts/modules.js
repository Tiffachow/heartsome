global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

// Polyfill(s) for older browsers
require('../../../node_modules/core-js/client/shim.min.js');
require('../../../node_modules/zone.js/dist/zone.js');
require('../../../node_modules/reflect-metadata/Reflect.js');

require('../../../node_modules/systemjs/dist/system.src.js');

// map tells the System loader where to look for things
var map = {
    'app':                        '../../dist/app',
    '@angular':                   '../../../node_modules/@angular',
    'rxjs':                       '../../../node_modules/rxjs'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app':                        { main: './app.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' }
};

var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
];

// Add package entries for angular packages
ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
});

var config = {
    map: map,
    packages: packages
}

System.config(config);

System.import("app")
    .catch(console.error.bind(console));

module.exports = function () { };