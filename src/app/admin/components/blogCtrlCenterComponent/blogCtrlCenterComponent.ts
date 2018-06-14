/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';
import {BlogPostsService} from './../../../services/BlogPostsService';
import {TagSuggestService} from './../../../services/TagSuggestService';
import {S3Service} from './../../../services/S3Service';

@Component({
	moduleId: module.id + '',
	selector: 'blog-control-center',
	styles: [],
	template: `
		<span>blog control center component</span>

		<div *ngFor="let post of blogPostsService.blogPosts" [ngClass]="{hideAnimated: openEditor}">
			{{post | json}}
			<div class="btn" (click)="onTriggerEditModal(post._id)">edit</div>
			<div class="btn" (click)="blogPostsService.delete(post._id, (openEditor = null))">delete</div>
		</div>

		<div *ngIf="openEditor">
			<div class="btn" (click)="openEditor=null">Close</div>
			<form *ngIf="openEditor=='create'" class="create-form post-create-form" (submit)="onSubmit($event, 'create')" #createForm="ngForm">
				CREATE NEW POST
				<div class="form-group">
					<label for="post-title">Title</label>
					<input type="text" class="form-control" id="post-title" name="post-title" required placeholder="Post Title">
				</div>
				<div class="form-group">
					<label for="post-description">Description</label>
					<input type="text" class="form-control" id="post-description" name="post-description" placeholder="Description">
				</div>
				<div class="form-group">
					<label for="post-tldr">TL;DR</label>
					<input type="text" class="form-control" id="post-tldr" name="post-tldr" placeholder="Yada yada... summareze pl0x">
				</div>
				<div class="form-group">
					<label for="post-body">Post Body</label>
					<textarea class="form-control" data-provide="markdown" id="post-body" name="post-body" required placeholder="Write in markdown"></textarea>
				</div>
				<p class="help-block">Preview image:</p>
				<img id="preview-post-image" [src]="image || 'http://avocaventures.com/wp-content/uploads/2014/11/lines-of-code.jpg'" alt="" width="100px" #previewImg>
				<div class="form-group">
					<label>Change image</label>
					<input type="file" id="post-image" (change)="handleFile($event)">
					<input type="hidden" class="post-image-url" id="post-image-hidden" name="post-image" #postImg [value]="">
					<div *ngIf="postImg.value" class="btn" (click)="removeImg()">delete</div>
				</div>
				<div class="checkbox">
					<label for="post-private">
						<input type="checkbox" id="post-private" name="post-private"> Private?
					</label>
				</div>
				<div class="form-group">
					<label for="post-tags">Tags</label><p class="help-block">Separate tags with enter key or commas</p>
					<input type="text" class="form-control" id="post-tags" name="post-tags" placeholder="Add tags">
				</div>
				<div class="form-group">
					<label for="post-categories">Categories</label><p class="help-block">Separate categories with enter key or commas</p>
					<input type="text" class="form-control" id="post-categories" name="post-categories" placeholder="Place in categories">
				</div>
				<div *ngIf="s3Service.loading">
					<p class="help-block">Uploading file(s). Please hold...</p>
					<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
					<span class="sr-only">Uploading files...</span>
				</div>
				<button [disabled]="!createForm.form.valid || s3Service.loading" type="submit" class="btn btn-default">Create New Post</button>
			</form>
			<form *ngIf="openEditor=='edit'" class="edit-form post-edit-form" (submit)="onSubmit($event, 'edit', currentlyEditing._id)" #editForm="ngForm">
				EDIT POST #{{currentlyEditing._id}}
				<div class="form-group">
					<label for="post-title">Title</label>
					<input type="text" class="form-control" id="post-title" name="post-title" required [value]="currentlyEditing.title" placeholder="Post Title">
				</div>
				<div class="form-group">
					<label for="post-description">Description</label>
					<input type="text" class="form-control" id="post-description" name="post-description" [value]="currentlyEditing.description" placeholder="Description">
				</div>
				<div class="form-group">
					<label for="post-tldr">TL;DR</label>
					<input type="text" class="form-control" id="post-tldr" name="post-tldr" [value]="currentlyEditing.tldr" placeholder="Yada yada... summareze pl0x">
				</div>
				<div class="form-group">
					<label for="post-body">Post Body</label>
					<textarea class="form-control" data-provide="markdown" id="post-body" name="post-body" required [value]="currentlyEditing.body" placeholder="Write in markdown"></textarea>
				</div>
				<p class="help-block">Preview image:</p>
				<img id="preview-post-image" #previewImg [src]="currentlyEditing.image || 'http://avocaventures.com/wp-content/uploads/2014/11/lines-of-code.jpg'" alt="" width="100px">
				<div class="form-group">
					<label>Change image</label>
					<input type="file" id="post-image" (change)="handleFile($event)">
					<input type="hidden" class="post-image-url" id="post-image-hidden" name="post-image" #postImg [value]="currentlyEditing.image">
					<div *ngIf="postImg.value" class="btn" (click)="removeImg()">delete</div>
				</div>
				<div class="checkbox">
					<label for="post-private">
						<input type="checkbox" [checked]="currentlyEditing.private" id="post-private" name="post-private"> Private?
					</label>
				</div>
				<div class="form-group">
					<label for="post-tags">Tags</label><p class="help-block">Separate tags with enter key or commas</p>
					<input type="text" class="form-control" id="post-tags" name="post-tags" [value]="currentlyEditing.tags" placeholder="Add tags">
				</div>
				<div class="form-group">
					<label for="post-categories">Categories</label><p class="help-block">Separate categories with enter key or commas</p>
					<input type="text" class="form-control" id="post-categories" name="post-categories" [value]="currentlyEditing.categories" placeholder="Place in categories">
				</div>
				<div *ngIf="s3Service.loading">
					<p class="help-block">Uploading file(s). Please hold...</p>
					<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
					<span class="sr-only">Uploading files...</span>
				</div>
				<button [disabled]="!editForm.form.valid || s3Service.loading" type="submit" class="btn btn-default">Publish</button>
				<div class="btn" (click)="blogPostsService.delete(currentlyEditing._id, (openEditor = null))">delete</div>
			</form>
		</div>
	`
})

export class BlogCtrlCenterComponent {
	openEditor: String;
	currentlyEditing: object;
	messageSubscription: Subscription;
	@ViewChild('postImg') postImgInput: any;
	@ViewChild('previewImg') previewImgInput: any;

	// Constructor
	constructor(
		private messageService: MessageService,
		private blogPostsService: BlogPostsService,
		private tagSuggestService: TagSuggestService,
		private s3Service: S3Service
	){}

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
		if (this.openEditor) {
			$("#post-body").markdown({
				iconlibrary: "fa",
				onChange: function(e){
				    // console.log("Changed!")
			  	},
			  	onPreview: function(e){
			  		return markdown.parse(e.getContent());
			  	}
		  	});
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

	onSubmit(event, task, id) {
		event.preventDefault();
		// if data valid:
		var dataObject = {};
		$(".post-"+task+"-form").serializeArray().map(function(x){dataObject[x.name] = x.value;});
		dataObject["post-tags"] = this.tagSuggestService.getInputTags("post-tags");
		dataObject["post-categories"] = this.tagSuggestService.getInputTags("post-categories");

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
			this.s3Service.getS3SignedRequest(input.files[0], "blog/"+this.currentlyEditing["title"]+"/images", this.postImgInput.nativeElement.id, this.previewImgInput.nativeElement.id);
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
