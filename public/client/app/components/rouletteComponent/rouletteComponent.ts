/// <reference path="../../../vendor.d.ts"/>

import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../services/MessageService';
import {VersionsService} from './../../services/VersionsService';
import {ProjectsService} from './../../services/ProjectsService';

@Component({
	moduleId: module.id + '',
	selector: 'roulette',
	styles: [],
	templateUrl: '/client/app/components/rouletteComponent/rouletteComponent.html'
})

export class RouletteComponent {
	messageSubscription: Subscription;
	routeSubscription: Subscription;
	project: Object;
	version: Object;
	type: string = this.route.params["type"] || "versions";
	alreadyInit: boolean = false;

	// Constructor
	constructor(public messageService: MessageService, public versionsService:VersionsService, public projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {}

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
		this.routeSubscription = this.route.params.subscribe((params: Params) => {
			console.log("PARAMS CHANGED", params);
			this.type = params['type'] || "versions";
			this.ngAfterViewInit();
		});
	}

	ngAfterViewInit() {
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

	ngOnDestroy() {
		this.messageSubscription.unsubscribe();
	}

}
