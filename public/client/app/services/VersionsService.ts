/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class VersionsService {
	versions: Array<string>;

	constructor() {
		this.versions = [ //mock? maybe store in DB/AWS later
			"cubic",
			"material",
			"typography"
		];
	}

	playRoulette() {
		return this.versions[ Math.floor( Math.random() * this.versions.length ) ];
	}
}
