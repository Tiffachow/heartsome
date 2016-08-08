/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES, NgForm} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';
import {BlogPostsService} from './../../../services/BlogPostsService';
import {TagSuggestService} from './../../../services/TagSuggestService';
import {S3Service} from './../../../services/S3Service';

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
	tagSuggestService: TagSuggestService;
	s3Service: S3Service;
	openEditor: String;
	messageSubscription: Subscription;
	currentlyEditing: Object;
	@ViewChild('postImg') postImgInput: ElementRef;
	@ViewChild('previewImg') previewImgInput: ElementRef;

	// Constructor
	constructor(messageService: MessageService, blogPostsService: BlogPostsService, tagSuggestService: TagSuggestService, s3Service: S3Service) {
		this.messageService = messageService;
		this.blogPostsService = blogPostsService;
		this.tagSuggestService = tagSuggestService;
		this.s3Service = s3Service;
		this.openEditor = null;
		this.messageSubscription;
		this.currentlyEditing = null;
	}

	// Functions
	ngOnInit() {
		this.subscribeToMessageService();
	}

	ngAfterViewInit() {
	}

	ngAfterViewChecked(){
		if (!$("#post-tags").hasClass("tag-ctn")) {
			this.tagSuggestService.initTagSuggestOnInput("post-tags","blogTag");
			this.tagSuggestService.initTagSuggestOnInput("post-categories","blogCategory");
		}
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
				}
			}
		);
	}

	onTriggerEditModal(id) {
		console.log("trigger modal for "+id);
		this.blogPostsService.getOne(id, function(post){
			console.log("callback, post = "+JSON.stringify(post));
			this.currentlyEditing = post;
			this.openEditor = "edit";
		}.bind(this));
	}

	onSubmit(event, task, id?) {
		event.preventDefault();
		// if data valid:
		var dataObject = {};
		$(".post-"+task+"-form").serializeArray().map(function(x){dataObject[x.name] = x.value;});
		dataObject["post-tags"] = this.tagSuggestService.getInputTags("post-tags");
		dataObject["post-categories"] = this.tagSuggestService.getInputTags("post-categories");
		// upload blog post body to s3 & then:
		dataObject["post-body"] = "s3linktopostfile";

		if (id) { //edit
			this.blogPostsService[task](dataObject, id, function(){this.openEditor = null;}.bind(this));
		} else { //create
			this.blogPostsService[task](dataObject, function(){this.openEditor = null;}.bind(this));
		}
	}

	handleFile(event) {
		this.removeImg();
		var input = event.target;
		if (input.files && input.files[0]) {
			console.log(this.postImgInput, this.postImgInput.nativeElement, this.postImgInput.nativeElement.id);
			console.log(this.previewImgInput, this.previewImgInput.nativeElement, this.previewImgInput.nativeElement.id);
			this.s3Service.getS3SignedRequest(input.files[0], "blog-images", this.postImgInput.nativeElement.id, this.previewImgInput.nativeElement.id);
		}
	}

	removeImg() {
		var filename = (this.postImgInput.nativeElement.value.split(".com/"))[1];
		if (filename) {
			this.s3Service.deleteObjectFromS3Bucket(filename);
			this.postImgInput.nativeElement.value = "";
			this.previewImgInput.nativeElement.src = "";
		}
	}

}