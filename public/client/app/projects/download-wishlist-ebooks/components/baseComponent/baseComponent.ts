/// <reference path="../../../../../vendor.d.ts"/>
import {AfterViewInit, AfterViewChecked, Component, OnInit} from '@angular/core';
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
	goodreads: Object;
	userShelves: Object;

	// Constructor
	constructor(http: Http, jsonp: Jsonp, utilsService: UtilsService) {
		this.http = http;
		this.jsonp = jsonp;
		this.utilsService = utilsService;
		this.goodreads = {};
		this.userShelves = {};
	}

	// Functions
	ngOnInit() {

	}

	ngAfterViewInit() {
		if (global.goodreads) {
			this.goodreads = global.goodreads;
			console.log("goodreads name: "+this.goodreads["userName"]);
			console.log("goodreads link: "+this.goodreads["userLink"]);
			this.getUserShelves();
		}
	}

	initSemanticMethods() {
		$('.ui.accordion').accordion();
		$('.special.cards .image').dimmer({
		  on: 'hover'
		});
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
					window.location = "https://www.goodreads.com/oauth/authorize?oauth_token=" + oauth_token;
				}
				);
		})(this);
	}

	// pullGoodreadsData() {
	// 	try{
	// 		localStorage.setItem('GoodreadsData', JSON.stringify(this.goodreads));
	// 	} catch (e) {
	// 		console.log("Error setting localStorage for Goodreads data: " + e);
	// 	}
	// }

	getUserShelves() {
		var tryCount = 0;
		var shelves;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_user_shelves')
				.subscribe(
				data => { shelves = data._body },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.userShelves = JSON.parse(shelves);
					setTimeout(function(){this_.initSemanticMethods()}, 1000);
				}
				);
		})(this);
	}

	getBooksFromShelf(shelfIndex, shelfId, shelfName) {
		var tryCount = 0;
		var books;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_shelf_books?shelf_id='+shelfId+'&shelf_name='+shelfName)
				.subscribe(
				data => { books = data._body },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.userShelves[shelfIndex].books = JSON.parse(books);
					setTimeout(function(){this_.initSemanticMethods()}, 1000);
				}
				);
		})(this);
	}

	searchForLinks(title, author, page) {
		var tryCount = 0;
		var searchResults;
		var startIndex = (page - 1) * 10 + 1;
		console.log('api request: ' + 'https://www.googleapis.com/customsearch/v1?key='+global.googleApp.browserApiKey+'&cx=003921693789393635481:flf1z5myj8y&prettyPrint=true&num=100&q='+encodeURIComponent(title + ' ' + author));
		(function tryRequest(this_) {
			this_.http.get('https://www.googleapis.com/customsearch/v1?key='+global.googleApp.browserApiKey+'&cx=003921693789393635481:flf1z5myj8y&prettyPrint=true&num=10&start='+startIndex+'&q='+encodeURIComponent(title + ' ' + author))
				.subscribe(
				data => { searchResults = data._body },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					JSON.parse(searchResults);
					console.log("SEARCH RESULTS: "+JSON.stringify(searchResults));
					$('.ui.fullscreen.modal')
						.modal('show')
						.transition('fly up')
					;
				}
				);
		})(this);
	}

	toggleModal() {
		$('.ui.modal')
			.modal('toggle')
			.transition('drop')
		;
	}
}