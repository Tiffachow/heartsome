/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {ProfileService} from './../../../services/ProfileService';

@Component({
	selector: 'profile-control-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/profileCtrlCenterComponent/profileCtrlCenterComponent.html',
})

export class ProfileCtrlCenterComponent {
	messageService: MessageService;
	profileService: ProfileService;

	// Constructor
	constructor(messageService: MessageService, profileService: ProfileService) {
		this.messageService = messageService;
		this.profileService = profileService;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

}