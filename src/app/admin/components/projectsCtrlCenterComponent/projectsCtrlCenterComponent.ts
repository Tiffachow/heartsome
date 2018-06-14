/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from './../../../services/MessageService';
import {ProjectsService} from './../../../services/ProjectsService';
import {TagSuggestService} from './../../../services/TagSuggestService';
import {S3Service} from './../../../services/S3Service';

@Component({
	moduleId: module.id + '',
	selector: 'projects-control-center',
	styles: [],
	template: `
		<span>projects control center component</span>

		<div *ngFor="let project of projectsService.projects" [ngClass]="{hideAnimated: openEditor}">
			{{post | json}}
			<div class="btn" (click)="onTriggerEditModal(project._id)">edit</div>
			<div class="btn" (click)="projectsService.delete(project._id, (openEditor = null))">delete</div>
		</div>

		<div *ngIf="openEditor">
			<div class="btn" (click)="openEditor=null">Close</div>
			<form *ngIf="openEditor=='create'" class="create-form project-create-form" (submit)="onSubmit($event, 'create')" #createForm="ngForm">
				CREATE NEW PROJECT
				<div class="form-group">
					<label for="project-title">Title</label>
					<input type="text" class="form-control" id="project-title" name="project-title" required placeholder="Project Title" required>
				</div>
				<div class="form-group">
					<label for="project-description">Description</label>
					<input type="text" class="form-control" id="project-description" name="project-description" placeholder="Description">
				</div>
				<div class="form-group">
					<label for="project-date">Date Finished</label>
					<input type="date" class="form-control" id="project-date" name="project-date">
				</div>
				<div class="form-group">
					<label for="project-timespent">Time Spent</label>
					<input type="text" class="form-control" id="project-timespent" name="project-timespent" placeholder="1.5 weeks">
				</div>
				<div class="checkbox">
					<label for="project-privacy">
						<input type="checkbox" id="project-privacy" name="project-privacy"> Private?
					</label>
				</div>
				<span class="display-block">Contributors:</span>
				<div class="form-group project-contributors project-contributors-{{i}}" *ngFor="let contributor of currentlyEditing.contributors; let i = index">
					<label>Contributor Name</label>
					<input type="text" class="form-control project-contributor-name" name="project-contributor-name" id="project-contributor-name-{{i}}" [value]="contributor.name || null" placeholder="Tiffany Chow">

					<label>Contributor Link</label>
					<input class="form-control project-contributor-link" name="project-contributor-link" id="project-contributor-link-{{i}}" [value]="contributor.link || null" placeholder="heartso.me">
					<button (click)="removeContributor(i)">Remove Contributor</button>
				</div>
				<button class="btn btn-default" type="button" (click)="addContributor()">Add more contributors</button>
				<span class="display-block">Built For:</span>
				<div class="form-group project-builtFor project-builtFor-{{i}}" *ngFor="let customer of currentlyEditing.builtFor; let i = index">
					<label>Customer Name</label>
					<input type="text" class="form-control project-customer-name" name="project-customer-name" id="project-customer-name-{{i}}" [value]="customer.name || null" placeholder="Tiffany Chow">

					<label>Customer Link</label>
					<input class="form-control project-customer-link" name="project-customer-link" id="project-customer-link-{{i}}" [value]="customer.link || null" placeholder="heartso.me">
					<button (click)="removeCustomer(i)">Remove Customer</button>
				</div>
				<button class="btn btn-default" type="button" (click)="addCustomer()">Add more customers</button>
				<div class="form-group">
					<label for="project-tech">Tags</label><p class="help-block">Separate tech with enter key or commas</p>
					<input type="text" class="form-control" id="project-tech" name="project-tech" placeholder="Add tech">
				</div>
				<span class="display-block">Images:</span>
				<div class="form-group project-images project-images-{{v}}" *ngFor="let image of currentlyEditing.images; let v = index">
					<label>Change image</label>
					<input type="file" id="project-images-{{v}}" name="project-images" (change)="handleFile($event, v, 'img')">
					<input type="hidden" class="project-images-urls" id="project-images-{{v}}-hidden" name="project-image-s3-url" [value]="image">
					<p class="help-block">Preview image:</p>
					<img id="preview-project-image-{{v}}" [src]="image || 'http://avocaventures.com/wp-content/uploads/2014/11/lines-of-code.jpg'" alt="" width="100px">
					<div *ngIf="image !== null" class="btn" (click)="removeImg(v)">delete</div>
				</div>
				<button class="btn btn-default" type="button" (click)="addImage()">Add more images</button>
				<span class="display-block">Videos:</span>
				<div class="form-group project-videos project-videos-{{v}}" *ngFor="let video of currentlyEditing.videos; let v = index">
					<label>Change video</label>
					<input type="file" id="project-videos-{{v}}" name="project-videos" (change)="handleFile($event, v, 'video')">
					<input type="hidden" class="project-videos-urls" id="project-videos-{{v}}-hidden" name="project-video-s3-url" [value]="video">
					<p class="help-block">Preview video:</p>
					<video id="preview-project-video-{{v}}" width="100" height="75" controls>
					  <source [src]="video || null" type="video/mp4">
					Your browser does not support the video tag.
					</video>
					<div *ngIf="video !== null" class="btn" (click)="removeVideo(v)">delete</div>
				</div>
				<button class="btn btn-default" type="button" (click)="addVideo()">Add more videos</button>

				<div *ngIf="s3Service.loading">
					<p class="help-block">Uploading file(s). Please hold...</p>
					<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
					<span class="sr-only">Uploading files...</span>
				</div>
				<button [disabled]="!createForm.form.valid || s3Service.loading" type="submit" class="btn btn-default">Create New Post</button>
			</form>
			<!-- <form *ngIf="openEditor=='edit'" class="edit-form post-edit-form" (submit)="onSubmit($event, 'edit', currentlyEditing._id)" #editForm="ngForm">
				EDIT POST #{{currentlyEditing._id}} //[value]="currentlyEditing.title"
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
			</form> -->
		</div>
	`
})

export class ProjectsCtrlCenterComponent {
	openEditor: String;
	messageSubscription: Subscription;
	currentlyEditing: object;

	// Constructor
	constructor(
		private messageService: MessageService,
		private projectsService: ProjectsService,
		private tagSuggestService: TagSuggestService,
		private s3Service: S3Service
	) {}

	// Functions
	ngOnInit() {
		this.subscribeToMessageService();
	}

	ngAfterViewInit() {
	}

	ngAfterViewChecked(){
		if (!$("#project-tech").hasClass("tag-ctn")) {
			this.tagSuggestService.initTagSuggestOnInput("project-tech","projectTech");
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
						if (message["data"][0]["ctrlCenter"] == "projects") {
							this.currentlyEditing = {
								contributors: [{}],
								builtFor: [{}],
								tech: [],
								images: [""],
								videos: [""]
							};
							this.openEditor = "create";
						}
						break;
				}
			}
		);
	}

	onTriggerEditModal(id) {
		console.log("trigger modal for "+id);
		this.projectsService.getOne(id, function(post){
			console.log("callback, post = "+JSON.stringify(post));
			this.currentlyEditing = post;
			this.openEditor = "edit";
		}.bind(this));
	}

	onSubmit(event, task, id) {
		event.preventDefault();
		// if data valid:
		var dataObject = {};
		$(".project-"+task+"-form").serializeArray().map(function(x){dataObject[x.name] = x.value;});
		dataObject["project-tech"] = this.tagSuggestService.getInputTags("project-tech");

		$(".project-contributors").each(function(i) {
			var contributor = {};
			contributor["name"] = $(this).children(".project-contributor-name").val();
			contributor["link"] = $(this).children(".project-contributor-link").val();
			if (contributor["name"] !== "") { //dont add empty contributors
				dataObject["project-contributors"].push(contributor);
			}
		});
		console.log("PROJECT CONTRIBUTORS: "+dataObject["project-contributors"]);

		$(".project-builtFor").each(function(i) {
			var builtFor = {};
			builtFor["name"] = $(this).children(".project-customer-name").val();
			builtFor["link"] = $(this).children(".project-customer-link").val();
			if (builtFor["name"] !== "") { //dont add empty customers
				dataObject["project-customers"].push(builtFor);
			}
		});
		console.log("PROJECT CUSTOMERS: "+dataObject["project-customers"]);

		// upload each img & video to s3
		dataObject["project-images"] = [];
		$(".project-images-urls").each(function(i) {
			if ($(this).val() !== "") { //dont add empty urls
				dataObject["project-images"].push($(this).val());
			}
		});
		dataObject["project-videos"] = [];
		$(".project-videos-urls").each(function(i) {
			if ($(this).val() !== "") { //dont add empty urls
				dataObject["project-videos"].push($(this).val());
			}
		});

		if (id) { //edit
			this.projectsService[task](dataObject, id, function(){this.openEditor = null;}.bind(this));
		} else { //create
			this.projectsService[task](dataObject, function(){this.openEditor = null;}.bind(this));
		}
	}

	handleFile(event, index, type) {
		var input = event.target;
		if (input.files && input.files[0]) {
			if (type == "img") {
				this.removeImg(index);
				this.s3Service.getS3SignedRequest(input.files[0], "projects/"+this.currentlyEditing["title"]+"/images", "project-images-"+index+"-hidden", "preview-project-image-"+index);
			} else {
				this.removeVideo(index);
				this.s3Service.getS3SignedRequest(input.files[0], "projects/"+this.currentlyEditing["title"]+"/videos", "project-videos-"+index+"-hidden", "preview-project-video-"+index);
			}
		}
	}

	removeContributor(i) {
		this.currentlyEditing["contributors"][i] = {};
	}

	removeCustomer(i) {
		this.currentlyEditing["builtFor"][i] = {};
	}

	removeImg(i) {
		var filename = ($("#project-images-" + i + "-hidden").val().split(".com/"))[1];
		if (filename !== "") {
			this.s3Service.deleteObjectFromS3Bucket(filename);
		}
		$("#project-images-" + i + " #project-images-" + i + "-hidden").val("");
		$("#preview-project-image-" + i).attr("src","");
	}

	removeVideo(i) {
		var filename = ($("#project-videos-" + i + "-hidden").val().split(".com/"))[1];
		if (filename !== "") {
			this.s3Service.deleteObjectFromS3Bucket(filename);
		}
		$("#project-videos-" + i + " #project-videos-" + i + "-hidden").val("");
		$("#preview-project-video-" + i).attr("src","");
	}

	addContributor() {
		this.currentlyEditing["contributors"].push({});
	}

	addCustomer() {
		this.currentlyEditing["builtFor"].push({});
	}

	addImage() {
		this.currentlyEditing["images"].push("");
	}

	addVideo() {
		this.currentlyEditing["videos"].push("");
	}

}
