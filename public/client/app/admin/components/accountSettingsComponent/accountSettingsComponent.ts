/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {ProfileService} from './../../../services/ProfileService';

@Component({
	selector: 'account-settings',
	styles: [],
	templateUrl: '/client/app/admin/components/accountSettingsComponent/accountSettingsComponent.html',
})

export class AccountSettingsComponent {
	messageService: MessageService;
	accountService: AccountService;
	profileService: ProfileService;

	// Constructor
	constructor(messageService: MessageService, accountService: AccountService, profileService: ProfileService) {
		this.messageService = messageService;
		this.accountService = accountService;
		this.profileService = profileService;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	// TO DO: get profile data & display. show edit form & post update through profile service. show logout option through account service

}