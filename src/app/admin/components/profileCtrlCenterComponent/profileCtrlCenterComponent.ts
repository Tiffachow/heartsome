/// <reference path="../../../../vendor.d.ts"/>
import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';

import {MessageService} from './../../../services/MessageService';
import {ProfileService} from './../../../services/ProfileService';
import {ProjectsService} from './../../../services/ProjectsService';
import {TagSuggestService} from './../../../services/TagSuggestService';
import {S3Service} from './../../../services/S3Service';

@Component({
	moduleId: module.id + '',
	selector: 'profile-control-center',
	styles: [],
	template: `
		<span>profile control center component</span>
		<div [ngClass]="{hideAnimated: openEditor}">
			{{profileService.profile | json}}
			<div class="btn" (click)="openEditor = true">edit</div>
		</div>

		<div *ngIf="openEditor">
			<div class="btn" (click)="openEditor=null">Close</div>
			<form class="edit-form profile-edit-form" (submit)="onSubmitEdit($event)" #editForm="ngForm">
				EDIT PROFILE
				<div class="form-inline">
					<div class="form-group">
						<label for="profile-firstname">First Name</label>
						<input type="text" class="form-control" id="profile-firstname" name="profile-firstname" [value]="profileService.profile.firstName" placeholder="First Name">
					</div>
					<div class="form-group">
						<label for="profile-lastname">Last Name</label>
						<input type="text" class="form-control" id="profile-lastname" name="profile-lastname" [value]="profileService.profile.lastName" placeholder="Last Name">
					</div>
				</div>
				<div class="form-group">
					<label for="profile-title">Title</label>
					<input type="text" class="form-control" id="profile-title" name="profile-title" [value]="profileService.profile.title" placeholder="Title">
				</div>
				<div class="form-group">
					<label for="profile-location">Location</label>
					<input type="text" class="form-control" id="profile-location" name="profile-location" [value]="profileService.profile.location" placeholder="location">
				</div>
				<div class="form-group">
					<label for="profile-email">Email</label>
					<input type="email" required class="form-control" id="profile-email" name="profile-email" [value]="profileService.profile.email" placeholder="email@email.com">
				</div>
				<div class="form-group">
					<label for="profile-websites">Website(s)</label>
					<input type="text" class="form-control" id="profile-websites" name="profile-websites" [value]="profileService.profile.websites" placeholder="www.heartso.me">
				</div>
				<div class="form-group">
					<label for="profile-about">About</label>
					<input type="text" class="form-control" id="profile-about" name="profile-about" [value]="profileService.profile.about" placeholder="A little bit about me:...">
				</div>
				<span>Images:</span>
				<div class="form-group profile-images profile-images-{{v}}" *ngFor="let image of profileService.profile.images; let v = index">
					<label>Change image</label>
					<input type="file" id="profile-images-{{v}}" name="profile-images" (change)="handleFile($event, v)">
					<input type="hidden" class="profile-images-urls" id="profile-images-{{v}}-hidden" name="profile-image-s3-url" [value]="image">
					<p class="help-block">Preview image:</p>
					<img id="preview-profile-image-{{v}}" [src]="image || 'http://avocaventures.com/wp-content/uploads/2014/11/lines-of-code.jpg'" alt="" width="100px">
					<div *ngIf="image" class="btn" (click)="removeImg(v)">delete</div>
				</div>
				<button class="btn btn-default" type="button" (click)="addImage()">Add more images</button>
				<div class="form-group">
					<label for="profile-dob">DOB</label>
					<input type="text" class="form-control" id="profile-dob" name="profile-dob" [value]="profileService.profile.dob | date:'longDate'" placeholder="July 3, 1993">
				</div>
				<div class="checkbox">
					<label for="profile-forhire">
						<input type="checkbox" [checked]="profileService.profile.forHire" id="profile-forhire" name="profile-forhire"> For Hire?
					</label>
				</div>
				<span>Skills:</span>
				<div class="form-group profile-skills profile-skills-{{i}}" *ngFor="let skill of profileService.profile.skills; let i = index">
					<label>Skill Name</label>
					<input type="text" class="form-control profile-skill-name" name="profile-skill-name" id="profile-skill-name-{{i}}" [value]="skill.name || null" placeholder="e.g. jquery">

					<label>Experience</label>
					<input type="text" class="form-control profile-skill-experience" name="profile-skill-experience" id="profile-skill-experience-{{i}}" [value]="skill.experience || null" placeholder="2 years">

					<label>Type</label>
					<select class="form-control profile-skill-type" name="profile-skill-type" id="profile-skill-type-{{i}}" [value]="skill.type || null">
					  <option value="language">language</option>
					  <option value="tool" selected>tool</option>
					</select>

					<label>Proficiency</label>
					<select class="form-control profile-skill-proficiency" name="profile-skill-proficiency" id="profile-skill-proficiency-{{i}}" [value]="skill.proficiency || null">
					  <option value="expert">expert</option>
					  <option value="advanced">advanced</option>
					  <option value="experienced" selected>experienced</option>
					  <option value="basic">basic</option>
					</select>

					<label>Works</label> {{skill.works}}
					<select multiple class="form-control profile-skill-works" name="profile-skill-works" id="profile-skill-works-{{i}}" [value]="skill.works || null">
					  <option *ngFor="let work of projectsService.projects">{{work.title}}</option>
					</select>
				</div>
				<button class="btn btn-default" type="button" (click)="addSkill()">Add more skills</button>
				<div class="form-group">
					<label for="profile-password">Password</label><p class="help-block">Also admin password</p>
					<input type="password" class="form-control" id="profile-password" name="profile-password" required [value]="profileService.profile.password" placeholder="profileService.profile.password">
				</div>
				<div *ngIf="s3Service.loading">
					<p class="help-block">Uploading image(s). Please hold...</p>
					<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
					<span class="sr-only">Uploading images...</span>
				</div>
				<button [disabled]="!editForm.form.valid || s3Service.loading" type="submit" class="btn btn-default">Save</button>
			</form>
		</div>
	`
})

export class ProfileCtrlCenterComponent {
	openEditor: boolean = false;

	// Constructor
	constructor(
		private messageService: MessageService,
		private profileService: ProfileService,
		private projectsService: ProjectsService,
		private tagSuggestService: TagSuggestService,
		private s3Service: S3Service
	) {}

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
			this.s3Service.getS3SignedRequest(input.files[0], "profile/images", "profile-images-"+index+"-hidden", "preview-profile-image-"+index);
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
