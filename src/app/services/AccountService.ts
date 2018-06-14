/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import {ProfileService} from './ProfileService';
import {MessageService} from './MessageService';
import {UtilsService} from './UtilsService';

@Injectable()
export class AccountService {
	loggedIn: boolean = false;
	httpOptions: object = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'my-auth-token'
		})
	};

	constructor(
		private http: Http,
		private utilsService: UtilsService,
		private profileService: ProfileService,
		private messageService: MessageService
	) {
		this.updateLoginStatus();
	}

	updateLoginStatus() {
		console.log("UPDATE LOGIN STATUS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/login')
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					this_.loggedIn = parsedData["loggedIn"];
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("done checking login status, loggedIn: " + this_.loggedIn);
				}
				);
		})(this);
	}

	mockLogin() {
		const loginData = {login: true};
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.post(global.basePath + '/api/login', loginData, this_.httpOptions)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					this_.loggedIn = parsedData["loggedIn"];
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("done logging in");
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
					this_.http.post(global.basePath + '/api/login', {login: true}, this_.httpOptions)
						.subscribe(
						data => {
							var parsedData = JSON.parse(data["_body"]);
							console.log(parsedData);
							this_.loggedIn = parsedData["loggedIn"];
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
			this_.http.get(global.basePath + '/api/logout')
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					this_.loggedIn = parsedData["loggedIn"];
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("logged out");
				}
				);
		})(this);
	}
}
