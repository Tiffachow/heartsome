/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

@Component({
	moduleId: module.id + '',
	selector: 'app-vers-ctrl-center',
	styles: [],
	templateUrl: './versionsCtrlCenterComponent.html',
})

export class VersionsCtrlCenterComponent {

	// Constructor
	constructor(
		private messageService: MessageService,
		private versionsService: VersionsService
	) {}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}
