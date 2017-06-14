/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {MessageService} from './MessageService';
import {UtilsService} from './UtilsService';

@Injectable()
export class ProfileService {
	http: Http;
	messageService: MessageService;
	utilsService: UtilsService;
	profile: Object;

	constructor(http: Http, messageService: MessageService, utilsService: UtilsService) {
		this.http = http;
		this.messageService = messageService;
		this.utilsService = utilsService;
		this.profile = { //mock? retrieve from mongoDB later
			id: 1,
			firstName: "Tiffany",
			lastName: "Chow",
			title: "Web Developer",
			location: "New York City",
			email: "tiffachow@gmail.com",
			websites: ["heartso.me"],
			about: "Blah",
			images: [],
			dob: new Date(),
			forHire: true,
			skills:  [
				{
					type: "language",
					name: "javascript",
					experience: "2 years",
					proficiency: "advanced",
					works: ["heartsome"],
				}
			],
			createdAt: new Date(),
			password: "censored"
		};
	}

	getProfile(callback?) {
		console.log("TRYING TO GET PROFILE");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/profile')
				.subscribe(
				data => {
					var data = JSON.parse(data._body);
					console.log(data);
					if (data.success) {
						this_.profile = data.profile;
					} else {
						console.log("Error getting profile");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get profile");
					if (callback) callback(this_.profile);
					return this_.profile;
				}
				);
		})(this);
	}

	edit(body, callback?) {
		console.log("TRYING TO EDIT POST WITH DATA "+JSON.stringify(body));
		var tryCount = 0;
		(function tryRequest(this_) {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this_.http.put(global.basePath + '/api/profile', body, options)
				.subscribe(
				data => {
					var data = JSON.parse(data._body);
					console.log(data);
					if (data.success) {
						this_.profile = data.profile;
					} else {
						console.log("Error getting profile");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed put profile");
					if (callback) callback(this_.profile);
					return this_.profile;
				}
				);
		})(this);
	}
}
