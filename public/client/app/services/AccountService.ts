/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {ProfileService} from './ProfileService';
import {MessageService} from './MessageService';
import {UtilsService} from './UtilsService';

@Injectable()
export class AccountService {
	http: Http;
	utilsService: UtilsService;
	profileService: ProfileService;
	messageService: MessageService;
	loggedIn: Boolean;

	constructor(http: Http, utilsService: UtilsService, profileService: ProfileService, messageService: MessageService) {
		this.http = http;
		this.profileService = profileService;
		this.messageService = messageService;
		this.utilsService = utilsService;
		this.loggedIn = false;
		this.updateLoginStatus();
	}

	updateLoginStatus() {
		console.log("UPDATE LOGIN STATUS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get('api/login')
				.subscribe(
				data => {
					console.log("loggedIn: "+JSON.parse(data._body).loggedIn);
					this_.loggedIn = JSON.parse(data._body).loggedIn;
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("done checking login status, loggedIn: " + this_.loggedIn);
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
				var tryCount = 0;
				(function tryRequest(this_) {
					this_.http.post('api/login')
						.subscribe(
						data => {
							console.log(data._body);
							this_.loggedIn = data._body.loggedIn;
						},
						err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
						() => {
							console.log("done logging in");
						}
						);
				})(this);
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
