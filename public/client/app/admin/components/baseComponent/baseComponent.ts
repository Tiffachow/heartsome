/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';
import {VersionsService} from './../../../services/VersionsService';
import {ProjectsService} from './../../../services/ProjectsService';
import {ProfileService} from './../../../services/ProfileService';
import {BlogPostsService} from './../../../services/BlogPostsService';

@Component({
	selector: 'dashboard',
	styles: [],
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