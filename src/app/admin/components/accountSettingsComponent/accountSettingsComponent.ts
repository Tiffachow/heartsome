/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {ProfileService} from './../../../services/ProfileService';

@Component({
	moduleId: module.id + '',
	selector: 'account-settings',
	styles: [],
	template: `
		<span>account settings component</span>

		<!-- TO DO: display data w/ functions to edit and logout-->
	`
})

export class AccountSettingsComponent {

	// Constructor
	constructor(
		private messageService: MessageService,
		private accountService: AccountService,
		private profileService: ProfileService
	) {}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	// TO DO: get profile data & display. show edit form & post update through profile service. show logout option through account service

}
