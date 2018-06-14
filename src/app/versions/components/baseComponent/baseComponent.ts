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
	templateUrl: './baseComponent.html',
	// template: `
	// 	<span>VERSIONS CONTAINER app working</span>
	// 	<version-cubic *ngIf="version == 'cubic'"></version-cubic>
	// 	<version-material *ngIf="version == 'material'"></version-material>
	// 	<version-typography *ngIf="version == 'typography'"></version-typography>
	// `,
})

export class VersionComponent {
	@Input() versionName: string;
	routeSubscription: Subscription;
	version: string;
	routeParams: object;

	// Constructor
	constructor(
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	// Functions
	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe((params: any) => {
			console.log("PARAMS CHANGED", params);
			this.routeParams = params;
			this.ngAfterViewInit();
		});
	}

	ngAfterViewInit() {
		this.version = this.routeParams['version'] ? this.routeParams['version'].toSlug() : this.versionName.toSlug();
	}
}
