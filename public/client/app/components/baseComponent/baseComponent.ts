/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
// import {Router, RouterLink, RouterOutlet, RouteParams} from '@angular/router-deprecated';
import { Routes, RouteSegment, ROUTER_DIRECTIVES , OnActivate} from '@angular/router';

import {VersionCubicComponent} from '../../version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from '../../version-material/components/baseComponent/baseComponent';

@Component({
	selector: 'base-component',
	styles: [],
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES,
		VersionCubicComponent, VersionMaterialComponent],
	templateUrl: '/client/app/components/baseComponent/baseComponent.html',
})

export class BaseComponent implements OnActivate {
	@Input() version: string;

	// Constructor
	constructor() {
	}

	routerOnActivate(curr: RouteSegment) {
		console.log("ROUTER ACTIVATED");
		this.version = curr.getParam("vers");
	}

	// Functions
	ngOnInit(){
	}

	ngAfterViewInit(){
		console.log("Current Version: " + this.version);
	}

}