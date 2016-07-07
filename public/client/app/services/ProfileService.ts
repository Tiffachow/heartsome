/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

import {MessageService} from './MessageService';

@Injectable()
export class ProfileService {
	messageService: MessageService;
	profile: Object;

	constructor(messageService: MessageService) {
		this.messageService = messageService;
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
			this_.http.get('api/profile')
				.subscribe(
				data => {
					console.log(data._body);
					if (data._body.success) {
						this_.profile = data._body.profile;
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

	edit(data, callback?) {
		console.log("TRYING TO EDIT POST WITH DATA "+JSON.stringify(data));
		var tryCount = 0;
		(function tryRequest(this_) {
			let body = JSON.stringify(data);
		   	let headers = new Headers({ 'Content-Type': 'application/json' });
		    let options = new RequestOptions({ headers: headers });
			this_.http.put('api/profile', body, options)
				.subscribe(
				data => {
					console.log(data._body);
					if (data._body.success) {
						this_.profile = data._body.profile;
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
