/// <reference path="../../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Headers, RequestOptions} from '@angular/http';

import {UtilsService} from './../../../../services/UtilsService';

@Component({
	selector: 'ebooks-download',
	styles: [],
	directives: [CORE_DIRECTIVES],
	templateUrl: '/client/app/projects/download-wishlist-ebooks/components/baseComponent/baseComponent.html',
})

export class DownloadWishlistEbooksComponent {
	http: Http;
	utilsService: UtilsService;

	// Constructor
	constructor(http: Http, utilsService: UtilsService) {
		this.http = http;
		this.utilsService = utilsService;
	}

	// Functions
	ngAfterViewInit(){

	}

	triggerGoodreadsOAuth() {
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_oauth')
				.subscribe(
				data => {
					global.GoodreadsAuthData = data;
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed oauth request, redirecting to sign in...");
					// setTimeout(function(){ window.location = "https://www.goodreads.com/user/sign_in" }, 2000);
				}
				);
		})(this);
	}

}