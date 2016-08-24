/// <reference path="../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../services/MessageService';
import {VersionsService} from './../../services/VersionsService';
import {ProjectsService} from './../../services/ProjectsService';

import {ProjectComponent} from './../../projects/components/baseComponent/baseComponent';
import {VersionComponent} from './../../versions/components/baseComponent/baseComponent';

@Component({
	selector: 'roulette',
	styles: [],
	directives: [CORE_DIRECTIVES, ProjectComponent, VersionComponent],
	templateUrl: '/client/app/components/rouletteComponent/rouletteComponent.html'
})

export class RouletteComponent {
	messageService: MessageService;
	messageSubscription: Subscription;
	projectsService: ProjectsService;
	project: Object;
	versionsService: VersionsService;
	version: Object;
	router: Router;
	route: ActivatedRoute;
	sub: any;
	type: string;
	alreadyInit: boolean;

	// Constructor
	constructor(messageService: MessageService, versionsService:VersionsService, projectsService: ProjectsService, router: Router, route: ActivatedRoute) {
		this.messageService = messageService;
		this.messageSubscription;
		this.versionsService = versionsService;
		this.projectsService = projectsService;
		this.router = router;
		this.route = route;
		this.type = this.route.params["type"] || "versions";
		this.alreadyInit = false;
	}

	// Functions

	subscribeToMessageService() {
		this.messageSubscription = this.messageService.message$.subscribe(message =>
			{
				switch (message["name"]) {
					case "activateRoulette":
						if (this.alreadyInit) {
							this.playRoulette();
						}
						break;
				}
			}
		);
	}

	ngOnInit(){
		this.subscribeToMessageService();
		this.playRoulette();
	}

	playRoulette() {
		this.sub = this.route
			.params
			.subscribe(params => {
				this.type = params['type'] || "versions";
			});
		if (this.type == "versions") {
			this.version = this.versionsService.playRoulette();
			console.log("Roulette version: " + this.version["name"]);
		} else if (this.type == "projects") {
			this.project = this.projectsService.playRoulette();
			if (this.project) {
				console.log("Roulette project: " + this.project["title"]);
			} else {
				console.log("No projects");
			}
		}
		this.alreadyInit = true;
	}

	ngOnChanges() {
		// console.log("changes");
	}

	ngDoCheck() {
		// console.log("do check");
	}

	ngAfterContentInit() {
		// console.log("AfterContentInit");
	}

	ngAfterContentChecked() {
		// console.log("AfterContentChecked");
	}

	ngAfterViewInit() {
		// console.log("AfterViewInit");
	}

	ngAfterViewChecked(){
		// console.log("AfterViewChecked");
	}

	ngOnDestroy() {
		this.messageSubscription.unsubscribe();
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

}