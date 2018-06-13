require('../scripts/customJS.js');
require('core-js/client/shim.min.js');
require('zone.js/dist/zone.js');
require('reflect-metadata/Reflect.js');
if (!global.Intl) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
}
// require('tether');
require('underscore');
require('bootstrap');
require('../../node_modules/bootstrap-markdown/js/bootstrap-markdown.js');
require('markdown');
require('../stylesheets/main.css');

import {enableProdMode}      	  from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

enableProdMode();
platform.bootstrapModule(AppModule);
