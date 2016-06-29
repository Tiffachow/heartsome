/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {VersionsService} from './../../services/VersionsService';

import {VersionCubicComponent} from './../../version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './../../version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './../../version-typography/components/baseComponent/baseComponent';

@Component({
	selector: 'roulette',
	styles: [],
	directives: [CORE_DIRECTIVES, VersionCubicComponent, VersionMaterialComponent, VersionTypographyComponent],
	templateUrl: '/client/app/components/rouletteComponent/rouletteComponent.html'
})

export class RouletteComponent {
	versionsService: VersionsService;
	version: string;

	// Constructor
	constructor(versionsService:VersionsService) {
		this.versionsService = versionsService;
	}

	// Functions

	ngOnInit(){
		this.version = this.versionsService.playRoulette();
		console.log("Roulette version: " + this.version);
	}

	ngAfterViewInit(){

	}

}