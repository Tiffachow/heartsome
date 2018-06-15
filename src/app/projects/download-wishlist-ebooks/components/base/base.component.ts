/// <reference path="../../../../../vendor.d.ts"/>
import {AfterViewInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {Http, Jsonp, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import {UtilsService} from './../../../../services/UtilsService';

@Component({
	moduleId: module.id + '',
	selector: 'ebooks-download',
	template: require('./base.component.html'),
})

export class DownloadWishlistEbooksComponent {
	goodreads: object = {};
	userShelves: object = {};
	bookCurrentlySearching: object = {
		title: "",
		author: "",
		image: "",
		currentPage: 0,
		resultPages: []
	};
	searchResults: object = {};
	authorizationLoaded: boolean = true;

	// Constructor
	constructor(
		private http: Http,
		private jsonp: Jsonp,
		private utilsService: UtilsService
	) {}

	// Functions
	ngOnInit() {
		console.log(this.authorizationLoaded);
	}

	ngAfterViewInit() {
		if (global.goodreads) {
			this.goodreads = global.goodreads;
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
		this.authorizationLoaded = false;
		var tryCount = 0;
		var oauth_token;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_oauth')
				.subscribe(
				data => { oauth_token = data["_body"] },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					window.location = "https://www.goodreads.com/oauth/authorize?oauth_token=" + oauth_token;
					console.log(this_.authorizationLoaded);
				}
				);
		})(this);
	}

	getUserShelves() {
		this.authorizationLoaded = false;
		var tryCount = 0;
		var shelves;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/goodreads_user_shelves')
				.subscribe(
				data => { shelves = data["_body"] },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.authorizationLoaded = true;
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
				data => { books = data["_body"] },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.userShelves[shelfIndex].books = JSON.parse(books);
					setTimeout(function(){this_.initSemanticMethods()}, 1000);
				}
				);
		})(this);
	}

	searchForLinks(title, author, image) {
		$('.ui.fullscreen.modal.google-results')
			.modal('setting', 'transition', 'horizontal flip')
			.modal('show');
		this.searchResults = {};
		title = title.split("(")[0];
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get('https://www.googleapis.com/customsearch/v1?key='+global.googleApp.browserApiKey+'&cx=003921693789393635481:flf1z5myj8y&prettyPrint=true&num=10&start=1&q='+encodeURIComponent(title + ' ' + author))
				.subscribe(
				data => { this_.searchResults = data["_body"] },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.searchResults = JSON.parse(this_.searchResults);
					this_.bookCurrentlySearching = {
						title: title,
						author: author,
						image: image,
						currentPage: 1,
						resultPages: []
					};

					var p;
					if (this_.searchResults["searchInformation"].totalResults / 10 > 10) {
						p = 10;
					} else {
						p = this_.searchResults["searchInformation"].totalResults / 10;
					}
					for (var i = 0; i < p; i++) {
						this_.bookCurrentlySearching["resultPages"].push(i);
					}
					$('.ui.fullscreen.modal.google-results').modal('refresh').modal('setting', 'transition', 'drop');
				}
				);
		})(this);
	}

	changePage(page) {
		$('.tab.segment .items')
			.transition('browse')
		;
		this.searchResults = {};
		var tryCount = 0;
		var startIndex = (page - 1) * 10 + 1;
		(function tryRequest(this_) {
			this_.http.get('https://www.googleapis.com/customsearch/v1?key='+global.googleApp.browserApiKey+'&cx=003921693789393635481:flf1z5myj8y&prettyPrint=true&num=10&start='+startIndex+'&q='+encodeURIComponent(this_.bookCurrentlySearching["title"] + ' ' + this_.bookCurrentlySearching["author"]))
				.subscribe(
				data => { this_.searchResults = data["_body"] },
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					this_.searchResults = JSON.parse(this_.searchResults);
					this_.bookCurrentlySearching["currentPage"] = page;
					$('.ui.fullscreen.modal.google-results').modal('refresh').modal('setting', 'transition', 'drop');
				}
				);
		})(this);
	}

	toggleModal() {
		$('.ui.fullscreen.modal.google-results').modal('toggle');
	}
}
