/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';
import {BlogPostsService} from './../../../services/BlogPostsService';

@Component({
	selector: 'blog-control-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/blogCtrlCenterComponent/blogCtrlCenterComponent.html',
})

export class BlogCtrlCenterComponent {
	messageService: MessageService;
	blogPostsService: BlogPostsService;
	openEditor: String;
	currentlyEditingID: Number;
	messageSubscription: Subscription;

	// Constructor
	constructor(messageService: MessageService, blogPostsService: BlogPostsService) {
		this.messageService = messageService;
		this.blogPostsService = blogPostsService;
		this.openEditor = null;
		this.currentlyEditingID = null;
		this.messageSubscription;
	}

	// Functions
	ngOnInit() {
		this.subscribeToMessageService();
	}

	ngAfterViewInit() {
	}

	ngOnDestroy(){
		this.messageSubscription.unsubscribe();
	}

	subscribeToMessageService() {
		this.messageSubscription = this.messageService.message$.subscribe(message =>
			{
				switch (message["name"]) {
					case "create":
						if (message["data"][0]["ctrlCenter"] == "blog") {
							this.openEditor = "create";
						}
						break;
					case "edit":
						if (message["data"][0]["ctrlCenter"] == "blog") {
							this.currentlyEditingID = message["data"][0]["id"];
							this.openEditor = "edit";
						}
						break;
					case "delete":
						if (message["data"][0]["ctrlCenter"] == "blog") {
							this.blogPostsService.delete(message["data"][0]["id"]);
						}
						break;
				}
			}
		);
	}

	onSubmit(task, data, id) {
		// if data valid:
		this.blogPostsService[task](data, id, function(){this.openEditor = null;}.bind(this));
	}

}