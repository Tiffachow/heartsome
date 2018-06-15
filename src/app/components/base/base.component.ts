/// <reference path="../../../vendor.d.ts"/>

import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
	moduleId: module.id + '',
	selector: 'base-component',
	styles: [],
	template: `
		<router-outlet></router-outlet>
	`
})

export class BaseComponent {
	private routeSubscription: Subscription;

	// Constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {
	}

	// Functions
	ngOnInit(){
		console.log("NEW BASE > ROUTER OUTLET COMPONENT");
		this.routeSubscription = this.route.params.subscribe((params: Params) => {
			console.log("PARAMS CHANGED", params);
			this.ngAfterViewInit();
		});
	}

	ngAfterViewInit(){
	}

}