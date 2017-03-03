/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

@Component({
	moduleId: module.id + '',
	selector: 'version-container',
	styles: [],
	templateUrl: '/client/app/versions/components/baseComponent/baseComponent.html',
})

export class VersionComponent {
	@Input() versionName: string;
	routeSubscription: Subscription;
	version: string;
	routeParams: Object;

	// Constructor
	constructor(public messageService: MessageService, private router: Router, private route: ActivatedRoute) {}

	// Functions
	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe((params: Params) => {
			console.log("PARAMS CHANGED", params);
			this.routeParams = params;
			this.ngAfterViewInit();
		});
	}

	ngAfterViewInit() {
		this.version = this.routeParams['version'] ? this.routeParams['version'].toSlug() : this.versionName.toSlug();
	}
}
