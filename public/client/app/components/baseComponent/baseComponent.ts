/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

@Component({
    selector: 'base-component',
    styles: [],
   	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
	templateUrl: '/client/app/components/baseComponent/baseComponent.html',
})

export class BaseComponent {


	// Constructor
	constructor() {

	}

	// Functions
	ngAfterViewInit(){

	}

}