/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class VersionsService {
	versions: Array<Object>;

	constructor() {
		this.versions = [ //mock? retrieve from mongoDB later
			{
				id: 1,
				name: "cubic",
				description: "cubic",
				timeSpent: "2 weeks",
				private: false,
				tags: ["geometry"],
				link: "/v/app;version=cubic",
				createdAt: new Date()
			},
			{
				id: 2,
				name: "material",
				description: "google material design standards",
				timeSpent: "1 month",
				private: false,
				tags: ["geometry", "web design"],
				link: "/v/app;version=material",
				createdAt: new Date()
			},
			{
				id: 3,
				name: "typography",
				description: "typography",
				timeSpent: "2 weeks",
				private: false,
				tags: ["web design"],
				link: "/v/app;version=typography",
				createdAt: new Date()
			},
		];
	}

	playRoulette() {
		return this.versions[ Math.floor( Math.random() * this.versions.length ) ];
	}

	create(data, callback?) {
		var result = {};
		return result;
	}

	getAll(playRoulette?, sortDate?, filterTag?, callback?) {
		// in callback to API request on complete:
		if (playRoulette) {
			return this.playRoulette();
		}
		var result = [];
		return result;
	}

	getOne(id, callback?) {
		var result = {};
		return result;
	}

	edit(data, id, callback?) {
		// callback on success
		var result = {};
		return result;
	}

	delete(id, callback?) {
	}
}
