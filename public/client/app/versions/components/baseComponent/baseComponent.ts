/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, AfterContentChecked, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

// Import all versions components here
import {VersionCubicComponent} from './../../version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './../../version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './../../version-typography/components/baseComponent/baseComponent';

@Component({
	selector: 'version-container',
	styles: [],
	directives: [
		CORE_DIRECTIVES,
		// add all version components here
		VersionCubicComponent, VersionMaterialComponent, VersionTypographyComponent
	],
	templateUrl: '/client/app/versions/components/baseComponent/baseComponent.html',
})

export class VersionComponent {
	@Input() versionName: any;
	messageService: MessageService;
	router: Router;
	route: ActivatedRoute;
	sub: any;
	version: String;
	routeParams: Object;

	// Constructor
	constructor(messageService: MessageService, router: Router, route: ActivatedRoute) {
		this.messageService = messageService;
		this.router = router;
		this.route = route;
		this.version;
		this.routeParams;
	}

	// Functions
	ngOnInit() {
		this.sub = this.route
			.params
			.subscribe(params => {
				this.routeParams = params;
			});
		this.version = this.routeParams['version'] ? this.routeParams['version'].toSlug() : this.versionName.toSlug();
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	ngAfterContentChecked() {
		this.version = this.routeParams['version'] ? this.routeParams['version'].toSlug() : this.versionName.toSlug();
	}
}