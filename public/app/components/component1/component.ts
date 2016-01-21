/// <reference path="../references.ts"/>

import {bootstrap} from 'angular2/platform/browser'; //beta
import {AfterViewInit, Component, Pipe, PipeTransform} from 'angular2/core'; //beta
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common'; //beta


@Component({
    selector: 'component',
    styles: [],
   	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
	templateUrl: '/src/app/components/component1/component.html',
})

export class FirstComponent {


	// Constructor
	constructor() {

	}

	// Functions
	ngAfterViewInit(){

	}

}

// $(function(){
// 	//
// })