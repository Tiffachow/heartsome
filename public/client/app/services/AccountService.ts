/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {ProfileService} from './ProfileService';
import {MessageService} from './MessageService';

@Injectable()
export class AccountService {
	profileService: ProfileService;
	messageService: MessageService;
	loggedIn: Boolean;

	constructor(profileService: ProfileService, messageService: MessageService) {
		this.profileService = profileService;
		this.messageService = messageService;
		this.loggedIn = false;
	}

	login(email, password) {
		// if credentials match account user's, log in
		this.profileService.getProfile(function(){
			var pw = "encrypt password";
			var storedPW = "decrypt this.profileService.profile.password"
			if (email == this.profileService.profile.email && pw == storedPW) {
				this.loggedIn = true;
			}
		}.bind(this));
	}

	logout() {
		this.loggedIn = false;
	}
}
