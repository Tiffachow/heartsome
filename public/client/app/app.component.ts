/// <reference path="../vendor.d.ts"/>

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Routes, RouterModule, Router, RouterLink, RouterOutlet, ActivatedRoute, Params} from '@angular/router';

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
	moduleId: module.id + '',
	selector: 'app',
	templateUrl: '/client/app/app.html',
})

export class CombineComponents {
	debug: boolean = false;

	constructor(private router: Router, public messageService: MessageService, public versionsService: VersionsService, public profileService: ProfileService,
		public projectsService: ProjectsService, public blogPostsService: BlogPostsService, public tagSuggestService: TagSuggestService) {}

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
