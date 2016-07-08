/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup} from '@angular/forms';

import {MessageService} from './../../../services/MessageService';
import {AccountService} from './../../../services/AccountService';

import {ProfileService} from './../../../services/ProfileService';
import {BlogPostsService} from './../../../services/BlogPostsService';
import {ProjectsService} from './../../../services/ProjectsService';
import {VersionsService} from './../../../services/VersionsService';

import {ProfileCtrlCenterComponent} from './../profileCtrlCenterComponent/profileCtrlCenterComponent';
import {ProjectsCtrlCenterComponent} from './../projectsCtrlCenterComponent/projectsCtrlCenterComponent';
import {BlogCtrlCenterComponent} from './../blogCtrlCenterComponent/blogCtrlCenterComponent';
import {VersionsCtrlCenterComponent} from './../versionsCtrlCenterComponent/versionsCtrlCenterComponent';
import {AccountSettingsComponent} from './../accountSettingsComponent/accountSettingsComponent';

@Component({
	selector: 'dashboard',
	styles: [],
	directives: [
		CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,
		ProfileCtrlCenterComponent, ProjectsCtrlCenterComponent, BlogCtrlCenterComponent,
		VersionsCtrlCenterComponent, AccountSettingsComponent
	],
	templateUrl: '/client/app/admin/components/baseComponent/baseComponent.html',
})

export class DashboardComponent {
	activeCtrlCenter: Object;
	currentCtrlCenter: String;
	messageService: MessageService;
	accountService: AccountService;
	profileService: ProfileService;
	blogPostsService: BlogPostsService;
	projectsService: ProjectsService;
	versionsService: VersionsService;

	// Constructor
	constructor(messageService: MessageService, accountService: AccountService, profileService: ProfileService,
		blogPostsService: BlogPostsService, projectsService: ProjectsService, versionsService: VersionsService) {
		this.messageService = messageService;
		this.accountService = accountService;
		this.profileService = profileService;
		this.versionsService = versionsService;
		this.blogPostsService = blogPostsService;
		this.projectsService = projectsService;
		this.activeCtrlCenter;
		this.currentCtrlCenter;
	}

	// Functions
	ngOnInit() {
		this.setActiveCtrlCenter("profile");
		this.profileService.getProfile();
		this.versionsService.getAll();
		this.blogPostsService.getAll();
		this.projectsService.getAll();
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

}