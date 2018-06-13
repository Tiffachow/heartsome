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
	template: `
		<div [ngClass]="{debug:debug}">
			<div class="app-settings">
				<!-- Split button -->
				<div class="btn-group">
					<button type="button" class="btn">App Version</button>
					<button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu">
						<li *ngFor="let version of versionsService.versions">
							<a [routerLink]="['v/'+version.name]">{{version.name}}</a>
						</li>
						<li role="separator" class="divider"></li>
						<li (click)="messageService.broadcast('activateRoulette', [])"><a [routerLink]="['roulette/versions']">let's play roulette!</a></li>
					</ul>
				</div>

				<div class="btn-group">
					<button type="button" class="btn">Projects</button>
					<button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu">
						<li *ngFor="let project of projectsService.projects">
							<a [routerLink]="['project/'+project.title.toSlug()]">{{project.title}}</a>
						</li>
						<li role="separator" class="divider"></li>
						<li (click)="messageService.broadcast('activateRoulette', [])"><a [routerLink]="['roulette/projects']">let's play roulette!</a></li>
					</ul>
				</div>

				<div class="btn-group">
					<button type="button" class="btn">Navigation</button>
					<button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
						<span class="sr-only">Toggle Dropdown</span>
					</button>
					<ul class="dropdown-menu">
						<ul>
							<span>Versions</span>
							<li (click)="messageService.broadcast('activateRoulette', [])"><a [routerLink]="['roulette/versions']">Versions Roulette</a></li>
							<li *ngFor="let version of versionsService.versions"><a [routerLink]="['v/'+version.name]">Version: {{version.name}}</a></li>
						</ul>
						<ul>
							<span>Projects</span>
							<li (click)="messageService.broadcast('activateRoulette', [])"><a [routerLink]="['roulette/projects']">Projects Roulette</a></li>
							<li *ngFor="let project of projectsService.projects"><a [routerLink]="['project/'+project.title.toSlug()]">Project: {{project.title}}</a></li>
						</ul>
						<li><a [routerLink]="['admin']">Dashboard - Admin Login</a></li>
						<li (click)="messageService.broadcast('activateRoulette', [])"><a [routerLink]="['']">Home / Versions Roulette</a></li>
					</ul>
				</div>

				<button type="button" class="btn debug-btn" (click)="debug=!debug">DEBUG: {{debug}}</button>
			</div>
			<router-outlet></router-outlet>

		</div>
	`
})

export class CombineComponents {
	debug: boolean = false;

	constructor(public messageService: MessageService, public versionsService: VersionsService, public profileService: ProfileService,
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
