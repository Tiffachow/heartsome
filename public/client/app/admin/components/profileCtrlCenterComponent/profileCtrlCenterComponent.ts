/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, NgForm} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {ProfileService} from './../../../services/ProfileService';
import {ProjectsService} from './../../../services/ProjectsService';
import {TagSuggestService} from './../../../services/TagSuggestService';
import {S3Service} from './../../../services/S3Service';

@Component({
	selector: 'profile-control-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/profileCtrlCenterComponent/profileCtrlCenterComponent.html',
})

export class ProfileCtrlCenterComponent {
	messageService: MessageService;
	profileService: ProfileService;
	projectsService: ProjectsService;
	tagSuggestService: TagSuggestService;
	s3Service: S3Service;
	openEditor: boolean;

	// Constructor
	constructor(messageService: MessageService, profileService: ProfileService, projectsService: ProjectsService, tagSuggestService: TagSuggestService,
		s3Service: S3Service) {
		this.messageService = messageService;
		this.profileService = profileService;
		this.projectsService = projectsService;
		this.tagSuggestService = tagSuggestService;
		this.s3Service = s3Service;
		this.openEditor = false;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	addSkill() {
		this.profileService.profile["skills"].push({});
	}

	addImage() {
		this.profileService.profile["images"].push("");
	}

	onSubmitEdit(event) {
		event.preventDefault();
		// if data valid:
		var dataObject = {};
		$(".profile-edit-form").serializeArray().map(function(x){dataObject[x.name] = x.value;});
		dataObject["profile-skills"] = [];
		$(".profile-skills").each(function(i) {
			var skill = {};
			skill["name"] = $(this).children(".profile-skill-name").val();
			skill["experience"] = $(this).children(".profile-skill-experience").val();
			skill["type"] = $(this).children(".profile-skill-type").val();
			skill["proficiency"] = $(this).children(".profile-skill-proficiency").val();
			skill["works"] = $(this).children(".profile-skill-works").val();
			if (skill["name"] !== "") { //dont add empty skills
				dataObject["profile-skills"].push(skill);
			}
		});
		console.log("PROFILE SKILLS: "+dataObject["profile-skills"]);
		// upload each img to s3
		dataObject["profile-images"] = [];
		$(".profile-images-urls").each(function(i) {
			if ($(this).val() !== "") { //dont add empty urls
				dataObject["profile-images"].push($(this).val());
			}
		});
		console.log("PROFILE IMAGES: "+dataObject["profile-images"]);
		// encrypt password

		this.profileService.edit(dataObject, function(){this.openEditor = false}.bind(this));
	}

	handleFile(event, index) {
		this.removeImg(index);
		var input = event.target;
		if (input.files && input.files[0]) {
			this.s3Service.getS3SignedRequest(input.files[0], "profile-images", "profile-images-"+index+"-hidden", "preview-profile-image-"+index);
		}
	}

	removeImg(index) {
		var filename = ($("#profile-images-" + index + "-hidden").val().split(".com/"))[1];
		if (filename) {
			this.s3Service.deleteObjectFromS3Bucket(filename);
			$("#profile-images-" + index + "-hidden").val("");
			$("#preview-profile-image-" + index).attr("src","");
		}
	}

}