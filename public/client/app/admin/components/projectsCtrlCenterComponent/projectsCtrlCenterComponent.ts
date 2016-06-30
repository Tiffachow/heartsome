/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {ProjectsService} from './../../../services/ProjectsService';

@Component({
	selector: 'projects-control-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/projectsCtrlCenterComponent/projectsCtrlCenterComponent.html',
})

export class ProjectsCtrlCenterComponent {
	messageService: MessageService;
	projectsService: ProjectsService;

	// Constructor
	constructor(messageService: MessageService, projectsService: ProjectsService) {
		this.messageService = messageService;
		this.projectsService = projectsService;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}