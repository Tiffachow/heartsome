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
	template: `
		<button type="button" class="btn fixed" (click)="mockToggleLogin()">Logged In: {{accountService.loggedIn}}</button>

		<h1>Admin Dashboard</h1>

		<div class="login-panel" *ngIf="!accountService.loggedIn">
			<form class="login-form" (submit)="login($event)" #loginForm="ngForm">
				<div class="form-group">
					<label for="user-email">Email address</label>
					<input type="email" class="form-control" id="user-email" placeholder="Email" required>
				</div>
				<div class="form-group">
					<label for="user-password">Password</label>
					<input type="password" class="form-control" id="user-password" placeholder="Password" required>
				</div>
				<button [disabled]="!loginForm.form.valid" type="submit" class="btn btn-default">Log In</button>
			</form>
		</div>

		<div class="dashboard-container" *ngIf="accountService.loggedIn">
			<ul class="nav nav-tabs">
				<li role="presentation" [ngClass]="{active: activeCtrlCenter.profile}">
					<a (click)="setActiveCtrlCenter('profile')">
						Profile
					</a>
				</li>
				<li role="presentation" [ngClass]="{active: activeCtrlCenter.versions}">
					<a (click)="setActiveCtrlCenter('versions')">
						App Versions <span class="badge">{{versionsService.versions.length}}</span>
					</a>
				</li>
				<li role="presentation" [ngClass]="{active: activeCtrlCenter.blog}">
					<a (click)="setActiveCtrlCenter('blog')">
						Blog Posts <span class="badge">{{blogPostsService.blogPosts.length}}</span>
					</a>
				</li>
				<li role="presentation" [ngClass]="{active: activeCtrlCenter.projects}">
					<a (click)="setActiveCtrlCenter('projects')">
						Projects <span class="badge">{{projectsService.projects.length}}</span>
					</a>
				</li>
				<li role="presentation" [ngClass]="{active: activeCtrlCenter.account}">
					<a (click)="setActiveCtrlCenter('account')">
						Account Settings
					</a>
				</li>
			</ul>

			<div class="dashboard-content-container">
				<div class="side-rail-menu" *ngIf="!activeCtrlCenter.profile && !activeCtrlCenter.account">
					<i (click)="openCreateForm()" class="material-icons orchid md-48 create-new">add_circle</i>
				</div>
				<div class="dashboard-content">
					<profile-control-center *ngIf="activeCtrlCenter.profile"></profile-control-center>
					<app-vers-ctrl-center *ngIf="activeCtrlCenter.versions"></app-vers-ctrl-center>
					<blog-control-center *ngIf="activeCtrlCenter.blog"></blog-control-center>
					<projects-control-center *ngIf="activeCtrlCenter.projects"></projects-control-center>
					<account-settings *ngIf="activeCtrlCenter.account"></account-settings>
				</div>
			</div>
		</div>
	`
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