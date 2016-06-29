/// <reference path="../vendor.d.ts"/>
import {AfterViewInit, OnInit, enableProdMode} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, provide} from '@angular/core';
import {Routes, Router, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {JSONP_PROVIDERS, Jsonp, Http, HTTP_PROVIDERS} from '@angular/http';

import {VersionsService} from './services/VersionsService';

@Component({
	selector: 'app',
	templateUrl: '/client/app/app.html',
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
	debug: boolean;
	versions: Array;

	constructor(router: Router, versionsService: VersionsService) {
		this.router = router;
		this.versionsService = versionsService;
		this.debug = true;
	}
	ngOnInit() {
	}
	ngAfterViewInit() {
	}
}

enableProdMode();
bootstrap(AppComponent, [
	JSONP_PROVIDERS, HTTP_PROVIDERS, APP_ROUTER_PROVIDERS,
	provide(APP_BASE_HREF, {useValue : "/" }),
	VersionsService
]).catch(err => console.error(err)); //services injected here are singletons available app-wide
