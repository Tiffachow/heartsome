/// <reference path="../vendor.d.ts"/>
import {AfterViewInit, OnInit, enableProdMode} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, provide} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {JSONP_PROVIDERS, Jsonp, Http, HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {VersionsService} from './services/VersionsService';
import {MessageService} from './services/MessageService';
import {AccountService} from './services/AccountService';
import {ProjectsService} from './services/ProjectsService';
import {ProfileService} from './services/ProfileService';
import {BlogPostsService} from './services/BlogPostsService';
import {TagSuggestService} from './services/TagSuggestService';
import {UtilsService} from './services/UtilsService';
import {S3Service} from './services/S3Service';

import {BaseComponent} from './components/baseComponent/baseComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';

@Component({
	selector: 'app',
	templateUrl: '/client/app/app.html',
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
	router: Router;
	messageService: MessageService;
	versionsService: VersionsService;
	projectsService: ProjectsService;
	profileService: ProfileService;
	blogPostsService: BlogPostsService;
	tagSuggestService: TagSuggestService;
	debug: boolean;

	constructor(router: Router, messageService: MessageService, versionsService: VersionsService, profileService: ProfileService,
		projectsService: ProjectsService, blogPostsService: BlogPostsService, tagSuggestService: TagSuggestService) {
		this.router = router;
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

enableProdMode();
bootstrap(AppComponent, [
	JSONP_PROVIDERS, HTTP_PROVIDERS,
	APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : "/" }),
	disableDeprecatedForms(), provideForms(),
	VersionsService, MessageService, AccountService,
	ProjectsService, ProfileService, BlogPostsService,
	TagSuggestService, UtilsService, S3Service,
	BaseComponent, RouletteComponent
]).catch(err => console.error(err)); //services injected here are singletons available app-wide
