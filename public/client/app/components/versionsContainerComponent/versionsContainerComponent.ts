/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';

import {VersionsService} from './../../services/VersionsService';

import {VersionCubicComponent} from './../../version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './../../version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './../../version-typography/components/baseComponent/baseComponent';

@Component({
	selector: 'versions-container',
	styles: [],
	directives: [CORE_DIRECTIVES, VersionCubicComponent, VersionMaterialComponent, VersionTypographyComponent],
	templateUrl: '/client/app/components/versionsContainerComponent/versionsContainerComponent.html',
})

export class VersionsContainerComponent {
	versionsService: VersionsService;
	router: Router;
	route: ActivatedRoute;
	version: string;
	sub: any;

	// Constructor
	constructor(versionsService: VersionsService, router: Router, route: ActivatedRoute) {
		this.versionsService = versionsService;
		this.router = router;
		this.route = route;
		this.version = this.route.params["version"];
	}

	// Functions
	ngOnInit() {
		this.sub = this.route
			.params
			.subscribe(params => {
				this.version = params['version'];
			});
		console.log("Selected version: "+this.version);
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	ngAfterViewInit(){

	}

}