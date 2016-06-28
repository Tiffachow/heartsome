/// <reference path="../vendor.d.ts"/>
import {AfterViewInit, OnInit, enableProdMode} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, provide} from '@angular/core';
import {Router, Routes, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app.routes';
// import {AuxRoute, Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouterLink, RouterOutlet} from '@angular/router-deprecated';
import {JSONP_PROVIDERS, Jsonp, Http, HTTP_PROVIDERS} from '@angular/http';

import {BaseComponent} from './components/baseComponent/baseComponent';

@Component({
	selector: 'app',
	template: `
		<div class="form-group version-ctrl">
			<label for="heartsome-version">Select Version: </label>
			<select class="form-control" name="heartsome-version" id="heartsome-version" (change)="changeVers()" [(ngModel)]="selectedVers" name="selectedVers">
				<option [value]="version" *ngFor="let version of versions">{{version}}</option>
			</select>
		</div>
		<router-outlet>
			<base-component [ngClass]="{debug:debug}" version={{selectedVers}}></base-component>
		</router-outlet>
		<button class="debug-btn" (click)="debug=!debug">DEBUG</button>
	`,
	directives: [BaseComponent, ROUTER_DIRECTIVES]
})

export class CombineComponents {
	router: Router;
	debug: boolean;
	versions: Array;
	selectedVers: string;

	constructor(router: Router){
		this.router = router;
		this.versions = [
			"cubic",
			"material"
		];
		this.selectedVers = "cubic";
		this.debug = true;
	}
	ngOnInit() {
		if ($("app").attr("data-version")) {
			this.selectedVers = $("app").attr("data-version");
		}
	}
	ngAfterViewInit() {

	}
	changeVers() {
		var version = $("#heartsome-version").val();
		console.log("CHANGE: ",version);
		this.router.navigate(['v', { vers: version }]);
	}
}

enableProdMode();
bootstrap(CombineComponents, [JSONP_PROVIDERS, HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : "/" })]).catch(err => console.error(err)); //services injected here are singletons available app-wide
