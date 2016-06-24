/// <reference path="../vendor.d.ts"/>
import {OnInit, enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, provide} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AuxRoute, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterLink, RouterOutlet} from '@angular/router-deprecated';
import {JSONP_PROVIDERS, Jsonp, Http, HTTP_PROVIDERS} from '@angular/http';

import {BaseComponent} from './components/baseComponent/baseComponent';

@Component({
	selector: 'app',
	template: `
		<prime-player [ngClass]="{debug:debug}"></prime-player>
		<button class="debug-btn" (click)="debug=!debug">DEBUG</button>
	`,
	directives: [BaseComponent, ROUTER_DIRECTIVES, RouterLink, RouterOutlet]
})

@RouteConfig([
	{ path: '/', redirectTo: ['Home'] },
	{ path: '/home', component: BaseComponent, name: 'Home' },
	// { path: '/app_dev.php/listen/station/:station_slug', component: StationPageComponent, name: 'Station' },
	// { path: '/404', component: ErrorPageComponent, name: '404' }
])

export class CombineComponents {

	constructor(){
	}
	ngOnInit() {
	}
}

enableProdMode();
bootstrap(CombineComponents, [JSONP_PROVIDERS, HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : "/" })]).catch(err => console.error(err)); //services injected here are singletons available app-wide
