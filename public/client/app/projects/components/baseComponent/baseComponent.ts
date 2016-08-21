/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from './../../../services/MessageService';
import {ProjectsService} from './../../../services/ProjectsService';

// import all projects components here

@Component({
	selector: 'dashboard',
	styles: [],
	directives: [
		CORE_DIRECTIVES,
	],
	templateUrl: '/client/app/projects/components/baseComponent/baseComponent.html',
})

export class ProjectComponent {
	router: Router;
	route: ActivatedRoute;
	projectName: string;
	sub: any;
	messageService: MessageService;
	projectsService: ProjectsService;

	// Constructor
	constructor(messageService: MessageService, projectsService: ProjectsService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
		this.projectName = this.route.params["name"];
		this.messageService = messageService;
		this.projectsService = projectsService;
	}

	// Functions
	ngOnInit() {
		this.sub = this.route
			.params
			.subscribe(params => {
				this.projectName = params['name'];
			});
		console.log("Selected project: "+this.projectName);
	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	ngAfterViewInit() {
	}
}