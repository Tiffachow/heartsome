/// <reference path="../../../../../vendor.d.ts"/>
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Jsonp, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {UtilsService} from './../../../../services/UtilsService';

@Component({
	selector: 'ebooks-download',
	styles: [],
	directives: [CORE_DIRECTIVES],
	templateUrl: '/client/app/projects/download-wishlist-ebooks/components/baseComponent/baseComponent.html',
})

export class DownloadWishlistEbooksComponent {
	http: Http;
	jsonp: Jsonp;
	utilsService: UtilsService;

	// Constructor
	constructor(http: Http, jsonp: Jsonp, utilsService: UtilsService) {
		this.http = http;
		this.jsonp = jsonp;
		this.utilsService = utilsService;
	}

	// Functions
	ngAfterViewInit(){
		if (global.goodreads_user_id) {
			console.log("goodreads_user_id: "+global.goodreads_user_id);
		}
	}

	triggerGoodreadsOAuth() {
		var tryCount = 0;
		var oauth_token;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_oauth')
				.subscribe(
				data => { oauth_token = data._body },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed oauth request, redirecting to sign in...");
					setTimeout(function(){ window.location = "https://www.goodreads.com/oauth/authorize?oauth_token=" + oauth_token }, 2000);
				}
				);
		})(this);
	}
}