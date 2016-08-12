/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {ProjectsService} from './../../../services/ProjectsService';
import {TagSuggestService} from './../../../services/TagSuggestService';

@Component({
	selector: 'projects-control-center',
	styles: [],
	directives: [
		CORE_DIRECTIVES
	],
	templateUrl: '/client/app/admin/components/projectsCtrlCenterComponent/projectsCtrlCenterComponent.html',
})

export class ProjectsCtrlCenterComponent {
	messageService: MessageService;
	projectsService: ProjectsService;
	tagSuggestService: TagSuggestService;

	// Constructor
	constructor(messageService: MessageService, projectsService: ProjectsService, tagSuggestService: TagSuggestService) {
		this.messageService = messageService;
		this.projectsService = projectsService;
		this.tagSuggestService = tagSuggestService;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	ngAfterViewChecked(){
		if (!$("#project-tech").hasClass("tag-ctn")) {
			this.tagSuggestService.initTagSuggestOnInput("project-tech","projectTech");
		}
	}

	onSubmit(event, task, id?) {
		event.preventDefault();
		// if data valid:
		var dataObject = {};
		$(".post-"+task+"-form").serializeArray().map(function(x){dataObject[x.name] = x.value;});
		dataObject["project-tech"] = this.tagSuggestService.getInputTags("project-tech");

		// $(".profile-skills").each(function(i) {
		// 	var skill = {};
		// 	skill["name"] = $(this).children(".profile-skill-name").val();
		// 	skill["experience"] = $(this).children(".profile-skill-experience").val();
		// 	skill["type"] = $(this).children(".profile-skill-type").val();
		// 	skill["proficiency"] = $(this).children(".profile-skill-proficiency").val();
		// 	skill["works"] = $(this).children(".profile-skill-works").val();
		// 	if (skill["name"] !== "") { //dont add empty skills
		// 		dataObject["profile-skills"].push(skill);
		// 	}
		// });
		// console.log("PROFILE SKILLS: "+dataObject["profile-skills"]);
		// // upload each img to s3
		// dataObject["profile-images"] = [];
		// $(".profile-images-urls").each(function(i) {
		// 	if ($(this).val() !== "") { //dont add empty urls
		// 		dataObject["profile-images"].push($(this).val());
		// 	}
		// });

		if (id) { //edit
			this.projectsService[task](dataObject, id, function(){this.openEditor = null;}.bind(this));
		} else { //create
			this.projectsService[task](dataObject, function(){this.openEditor = null;}.bind(this));
		}
	}

}