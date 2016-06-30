/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class ProjectsService {
	projects: Array<Object>;

	constructor() {
		this.projects = [ //mock? retrieve from mongoDB later
			{
				id: 1,
				contributors: {
					name: "Tiffany Chow",
					links: ["heartso.me"],
				},
				builtFor: [{
					name: null,
					links: null,
				}],
				title: "Picllery",
				description: "Social media photo gallery",
				tech: ["nodejs","angular1","google geolocation"],
				images: [],
				videos: [],
				date: new Date(),
				private: false,
				timeSpent: "1.5 weeks",
				createdAt: new Date()
			},
			{
				id: 2,
				contributors: {
					name: "Tiffany Chow",
					links: ["heartso.me"],
				},
				builtFor: [{
					name: null,
					links: null,
				}],
				title: "Flippy",
				description: "My first JS app - a web game",
				tech: ["html5 canvas","javascript"],
				images: [],
				videos: [],
				date: new Date(),
				private: false,
				timeSpent: "3 weeks",
				createdAt: new Date()
			},
		];
	}

	create(data, callback?) {
	}

	getAll(sortDate?, filterTech?, filterCustomer?, callback?) {
	}

	getOne(id, callback?) {
	}

	edit(data, id, callback?) {
		// callback on success
	}

	delete(id, callback?) {
	}
}
