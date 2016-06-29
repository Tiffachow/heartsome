/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class VersionsService {
	versions: Array;

	constructor() {
		this.versions = [ //mock? maybe store in DB/AWS later
			"cubic",
			"material"
		];
	}

	playRoulette() {
		return this.versions[ Math.floor( Math.random() * this.versions.length ) ];
	}
}
