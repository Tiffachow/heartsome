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
		var result = {};
		return result;
	}

	edit(data, id?, callback?) {
		// callback on success
		var result = {};
		return result;
	}
}
