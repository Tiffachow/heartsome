/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';

@Component({
	moduleId: module.id + '',
	selector: 'project-container',
	styles: [],
	template: require('./base.component.html'),
})

export class ProjectComponent {
	@Input() projectName: string;
	routeSubscription: Subscription;
	project: string;
	routeParams: object;

	// Constructor
	constructor(
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	// Functions
	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe((params: Params) => {
			console.log("PARAMS CHANGED", params);
			this.routeParams = params;
			this.ngAfterViewInit();
		});
	}

	ngAfterViewInit() {
		this.project = this.routeParams['name'] ? this.routeParams['name'].toSlug() : this.projectName.toSlug();
	}
}
