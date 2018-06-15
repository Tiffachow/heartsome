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
	template: require('./projectsCtrlCenter.component.html'),
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
