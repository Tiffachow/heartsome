/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {VersionsService} from './../../../services/VersionsService';

@Component({
	moduleId: module.id + '',
	selector: 'app-vers-ctrl-center',
	styles: [],
	template: `
		<span>app versions control center component</span>

		<!-- TO DO: display data w/ functions to edit and delete-->
		<!-- TO DO: create form modals for add & edit -->
	`
})

export class VersionsCtrlCenterComponent {

	// Constructor
	constructor(public messageService: MessageService, public versionsService: VersionsService) {}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}
