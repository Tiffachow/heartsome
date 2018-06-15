/// <reference path="../vendor.d.ts"/>

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Routes, RouterModule, RouterLink, RouterOutlet} from '@angular/router';

import {MessageService} from './services/MessageService';
import {VersionsService} from './services/VersionsService';
import {ProjectsService} from './services/ProjectsService';
import {ProfileService} from './services/ProfileService';
import {BlogPostsService} from './services/BlogPostsService';
import {TagSuggestService} from './services/TagSuggestService';

@Component({
	moduleId: module.id + '',
	selector: 'app',
	template: require('./app.component.html'),
})

export class CombineComponents {
	debug: boolean = false;

	constructor(
		private messageService: MessageService,
		private versionsService: VersionsService,
		private projectsService: ProjectsService,
		private blogPostsService: BlogPostsService,
		private tagSuggestService: TagSuggestService,
		private profileService: ProfileService
	) {}

	ngOnInit() {
		this.profileService.getProfile(false);
		this.versionsService.getAll(false, false, false);
		this.blogPostsService.getAll(false, false, false, false);
		this.projectsService.getAll(false, false, false, false);
		this.tagSuggestService.getAll(false);
	}

	ngAfterViewInit() {
	}
}
