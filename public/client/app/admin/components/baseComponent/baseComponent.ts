/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {VersionsService} from './../../../services/VersionsService';
import {ProjectsService} from './../../../services/ProjectsService';
import {ProfileService} from './../../../services/ProfileService';
import {BlogPostsService} from './../../../services/BlogPostsService';


@Component({
	moduleId: module.id + '',
	selector: 'dashboard',
	styles: [],
	templateUrl: '/client/app/admin/components/baseComponent/baseComponent.html',
})

export class DashboardComponent {
	activeCtrlCenter: Object;
	currentCtrlCenter: String;

	// Constructor
	constructor(public messageService: MessageService, public accountService: AccountService, public versionsService: VersionsService,
		public profileService: ProfileService, public projectsService: ProjectsService, public blogPostsService: BlogPostsService) {}

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
