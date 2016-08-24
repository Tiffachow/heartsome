/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, AfterContentChecked, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from './../../../services/MessageService';

// Import all project components here
import {DownloadWishlistEbooksComponent} from './../../../projects/download-wishlist-ebooks/components/baseComponent/baseComponent';

@Component({
	selector: 'project-container',
	styles: [],
	directives: [
		CORE_DIRECTIVES,
		// add all project components here
		DownloadWishlistEbooksComponent
	],
	templateUrl: '/client/app/projects/components/baseComponent/baseComponent.html',
})

export class ProjectComponent {
	@Input() projectName: string;
	messageService: MessageService;
	router: Router;
	route: ActivatedRoute;
	sub: any;
	project: string;
	routeParams: Object;

	// Constructor
	constructor(messageService: MessageService, router: Router, route: ActivatedRoute) {
		this.messageService = messageService;
		this.router = router;
		this.route = route;
		this.routeParams;
		this.project;
	}

	// Functions
	ngOnInit() {
		this.sub = this.route
			.params
			.subscribe(params => {
				this.routeParams = params;
			});
		this.project = this.routeParams['name'] ? this.routeParams['name'].toSlug() : this.projectName.toSlug();
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	ngAfterContentChecked() {
		this.project = this.routeParams['name'] ? this.routeParams['name'].toSlug() : this.projectName.toSlug();
	}

	ngAfterViewInit() {
	}
}