/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {VersionsService} from './../../services/VersionsService';

import {VersionCubicComponent} from './../../version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './../../version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './../../version-typography/components/baseComponent/baseComponent';

@Component({
	selector: 'versions-container',
	styles: [],
	directives: [CORE_DIRECTIVES, VersionCubicComponent, VersionMaterialComponent, VersionTypographyComponent],
	templateUrl: '/client/app/components/versionsContainerComponent/versionsContainerComponent.html',
})

export class VersionsContainerComponent {
	versionsService: VersionsService;

	// Constructor
	constructor(versionsService: VersionsService) {
		this.versionsService = versionsService;
	}

	// Functions
	ngOnInit() {
		console.log("Selected version: N/A yet.");
	}

	ngAfterViewInit(){

	}

}