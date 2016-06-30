/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

@Component({
	selector: 'app-vers-ctrl-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/versionsCtrlCenterComponent/versionsCtrlCenterComponent.html',
})

export class VersionsCtrlCenterComponent {
	messageService: MessageService;
	versionsService: VersionsService;

	// Constructor
	constructor(messageService: MessageService, versionsService: VersionsService) {
		this.messageService = messageService;
		this.versionsService = versionsService;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}