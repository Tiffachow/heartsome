/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, AfterContentChecked, Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from './../../../services/MessageService';

@Component({
	selector: 'project-container',
	styles: [],
	templateUrl: '/client/app/projects/components/baseComponent/baseComponent.html',
})

export class ProjectComponent {
	@Input() projectName: any;
	messageService: MessageService;
	router: Router;
	route: ActivatedRoute;
	sub: any;
	project: String;
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