/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {ProfileService} from './../../../services/ProfileService';

@Component({
	moduleId: module.id + '',
	selector: 'account-settings',
	styles: [],
	templateUrl: '/client/app/admin/components/accountSettingsComponent/accountSettingsComponent.html',
})

export class AccountSettingsComponent {

	// Constructor
	constructor(public messageService: MessageService, public accountService: AccountService, public profileService: ProfileService) {}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	// TO DO: get profile data & display. show edit form & post update through profile service. show logout option through account service

}
