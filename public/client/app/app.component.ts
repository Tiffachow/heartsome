/// <reference path="../vendor.d.ts"/>

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import {VersionsService} from './services/VersionsService';
import {MessageService} from './services/MessageService';
import {AccountService} from './services/AccountService';
import {ProjectsService} from './services/ProjectsService';
import {ProfileService} from './services/ProfileService';
import {BlogPostsService} from './services/BlogPostsService';
import {TagSuggestService} from './services/TagSuggestService';
import {UtilsService} from './services/UtilsService';
import {S3Service} from './services/S3Service';

@Component({
	selector: 'app',
	templateUrl: '/client/app/app.html',
})

export class AppComponent {
	messageService: MessageService;
	versionsService: VersionsService;
	projectsService: ProjectsService;
	profileService: ProfileService;
	blogPostsService: BlogPostsService;
	tagSuggestService: TagSuggestService;
	debug: boolean;

	constructor(messageService: MessageService, versionsService: VersionsService, profileService: ProfileService,
		projectsService: ProjectsService, blogPostsService: BlogPostsService, tagSuggestService: TagSuggestService) {
		this.messageService = messageService;
		this.versionsService = versionsService;
		this.projectsService = projectsService;
		this.profileService = profileService;
		this.blogPostsService = blogPostsService;
		this.tagSuggestService = tagSuggestService;
		this.debug = false;
	}
	ngOnInit() {
		this.profileService.getProfile();
		this.versionsService.getAll();
		this.blogPostsService.getAll();
		this.projectsService.getAll();
		this.tagSuggestService.getAll();
	}

	ngAfterViewInit() {
	}
}