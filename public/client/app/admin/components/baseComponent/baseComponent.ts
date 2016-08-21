/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';

@Component({
	selector: 'dashboard',
	styles: [],
	directives: [
		CORE_DIRECTIVES,
	],
	templateUrl: '/client/app/admin/components/baseComponent/baseComponent.html',
})

export class DashboardComponent {
	activeCtrlCenter: Object;
	currentCtrlCenter: String;
	messageService: MessageService;
	accountService: AccountService;

	// Constructor
	constructor(messageService: MessageService, accountService: AccountService) {
		this.messageService = messageService;
		this.accountService = accountService;
		this.activeCtrlCenter;
		this.currentCtrlCenter;
	}

	// Functions
	ngOnInit() {
		this.setActiveCtrlCenter("profile");
	}

	ngAfterViewInit() {
	}

	setActiveCtrlCenter(ctrlCenter) {
		this.activeCtrlCenter = {
			profile: false,
			versions: false,
			blog: false,
			projects: false,
			account: false
		}
		this.activeCtrlCenter[ctrlCenter] = true;
		this.currentCtrlCenter = ctrlCenter;
	}

	openCreateForm() {
		this.messageService.broadcast('create', [{ctrlCenter: this.currentCtrlCenter}]);
	}

	mockToggleLogin() {
		this.accountService.loggedIn ? this.accountService.logout() : this.accountService.mockLogin();
	}

}