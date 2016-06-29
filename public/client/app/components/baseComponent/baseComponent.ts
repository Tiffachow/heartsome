/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Routes, Router, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
	selector: 'base-component',
	styles: [],
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
	templateUrl: '/client/app/components/baseComponent/baseComponent.html'
})

export class BaseComponent {

	// Constructor
	constructor() {
	}

	// Functions
	ngOnInit(){
		console.log("NEW BASE > ROUTER OUTLET COMPONENT");
	}

	ngAfterViewInit(){
	}

}