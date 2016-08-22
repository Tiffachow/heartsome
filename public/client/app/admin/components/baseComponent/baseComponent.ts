/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {VersionsService} from './../../../services/VersionsService';
import {ProjectsService} from './../../../services/ProjectsService';
import {ProfileService} from './../../../services/ProfileService';
import {BlogPostsService} from './../../../services/BlogPostsService';


import {ProjectsCtrlCenterComponent} from './../ProjectsCtrlCenterComponent/ProjectsCtrlCenterComponent';
import {ProfileCtrlCenterComponent} from './../ProfileCtrlCenterComponent/ProfileCtrlCenterComponent';
import {BlogCtrlCenterComponent} from './../BlogCtrlCenterComponent/BlogCtrlCenterComponent';
import {VersionsCtrlCenterComponent} from './../VersionsCtrlCenterComponent/VersionsCtrlCenterComponent';
import {AccountSettingsComponent} from './../AccountSettingsComponent/AccountSettingsComponent';


@Component({
	selector: 'dashboard',
	styles: [],
	directives: [
		CORE_DIRECTIVES,
		ProjectsCtrlCenterComponent, ProfileCtrlCenterComponent, BlogCtrlCenterComponent,
		VersionsCtrlCenterComponent, AccountSettingsComponent
	],
	templateUrl: '/client/app/admin/components/baseComponent/baseComponent.html',
})

export class DashboardComponent {
	activeCtrlCenter: Object;
	currentCtrlCenter: String;
	messageService: MessageService;
	accountService: AccountService;
	versionsService: VersionsService;
	projectsService: ProjectsService;
	profileService: ProfileService;
	blogPostsService: BlogPostsService;

	// Constructor
	constructor(messageService: MessageService, accountService: AccountService, versionsService: VersionsService,
		profileService: ProfileService, projectsService: ProjectsService, blogPostsService: BlogPostsService) {
		this.messageService = messageService;
		this.accountService = accountService;
		this.versionsService = versionsService;
		this.projectsService = projectsService;
		this.profileService = profileService;
		this.blogPostsService = blogPostsService;
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