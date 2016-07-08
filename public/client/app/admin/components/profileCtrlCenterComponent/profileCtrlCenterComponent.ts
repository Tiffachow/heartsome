/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, NgForm} from '@angular/common';

import {MessageService} from './../../../services/MessageService';
import {ProfileService} from './../../../services/ProfileService';
import {TagSuggestService} from './../../../services/TagSuggestService';

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
	tagSuggestService: TagSuggestService;
	openEditor: boolean;

	// Constructor
	constructor(messageService: MessageService, profileService: ProfileService, tagSuggestService: TagSuggestService) {
		this.messageService = messageService;
		this.profileService = profileService;
		this.tagSuggestService = tagSuggestService;
		this.openEditor = false;
	}

	// Functions
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	onSubmitEdit(event) {
		event.preventDefault();
		// if data valid:
		var dataObject = JSON.parse(JSON.stringify($(".profile-edit-form").serializeArray()));
		// upload each img to s3
		// encrypt password

		this.profileService.edit(dataObject, function(){this.openEditor = false}.bind(this));
	}

	readURL(event) {
		var input = event.target;
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#preview-profile-image').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

}