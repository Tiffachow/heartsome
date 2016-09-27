/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
	selector: 'base-component',
	styles: [],
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