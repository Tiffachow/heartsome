/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, AfterContentChecked, Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

@Component({
	selector: 'version-container',
	styles: [],
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