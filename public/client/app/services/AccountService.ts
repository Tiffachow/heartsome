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
		this.checkLoginStatus();
	}

	checkLoginStatus() {
		console.log("CHECK LOGIN STATUS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get('api/login')
				.subscribe(
				data => {
					this_.loggedIn = console.log(JSON.parse(data.loggedIn));
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("done checking login status");
				}
				);
		})(this);
	}

	login(event) {
		event.preventDefault();
		var email = $("#user-email").val();
		var password = $("#user-password").val();
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
		console.log("TRYING TO LOGOUT");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get('api/logout')
				.subscribe(
				data => {
					console.log(JSON.parse(data));
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("logged out");
					this_.loggedIn = false;
				}
				);
		})(this);
	}
}
