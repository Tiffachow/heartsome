/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {UtilsService} from './UtilsService';

@Injectable()
export class BlogPostsService {
	blogPosts: Array<Object>;
	http: Http;

	constructor(http: Http) {
		this.http = http;
		this.utilsService = UtilsService;
		this.blogPosts = [ //mock? retrieve from mongoDB later
			{
				id: 1,
				title: "Revamping Heartsome 1",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: null,
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 2,
				title: "Revamping Heartsome 2",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: null,
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 3,
				title: "Revamping Heartsome 3",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: null,
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			}
		];
	}

	create(data, callback?) {
		console.log("TRYING TO CREATE NEW POST WITH DATA "+JSON.stringify(data));
		var tryCount = 0;
		(function tryRequest(this_) {
			let body = JSON.stringify(data);
		   	let headers = new Headers({ 'Content-Type': 'application/json' });
		    let options = new RequestOptions({ headers: headers });
			this_.http.post('api/blog/new', body, options)
				.subscribe(
				data => {
					console.log(JSON.parse(data));
					if (JSON.parse(data.success)) {
						// update this.blogPosts
						this_.blogPosts = JSON.parse(data.posts);
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed post");
					var result = this.blogPosts[this.blogPosts.length - 1];
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	getAll(sortDate?, filterTag?, filterCategory?, callback?) {
		console.log("TRYING TO GET ALL POSTS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get('api/blog/all')
				.subscribe(
				data => {
					console.log(JSON.parse(data));
					if (JSON.parse(data.success)) {
						// update this.blogPosts
						this_.blogPosts = JSON.parse(data.posts);
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get all");
					if (callback) callback(this_.blogPosts);
					return this_.blogPosts;
				}
				);
		})(this);
	}

	getOne(id, callback?) {
		console.log("TRYING TO GET POST WITH ID "+id);
		var tryCount = 0;
		var result;
		(function tryRequest(this_) {
			this_.http.get('api/blog/post/'+id)
				.subscribe(
				data => {
					console.log(JSON.parse(data));
					if (JSON.parse(data.success)) {
						result = JSON.parse(data.post);
					} else {
						console.log("Error getting post");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get one");
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	edit(data, id, callback?) {
		console.log("TRYING TO EDIT POST WITH DATA "+JSON.stringify(data));
		var tryCount = 0;
		(function tryRequest(this_) {
			let body = JSON.stringify(data);
		   	let headers = new Headers({ 'Content-Type': 'application/json' });
		    let options = new RequestOptions({ headers: headers });
			this_.http.put('api/blog/post/'+id, body, options)
				.subscribe(
				data => {
					console.log(JSON.parse(data));
					if (JSON.parse(data.success)) {
						// update this.blogPosts
						this_.blogPosts = JSON.parse(data.posts);
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed put");
					var result;
					for (var i in this_.blogPosts){
						if (this_.blogPosts[i].id == id) {
							result = this_.blogPosts[i];
						}
					}
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	delete(id, callback?) {
		console.log("TRYING TO DELETE POST WITH ID "+id);
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.delete('api/blog/post/'+id)
				.subscribe(
				data => {
					console.log(JSON.parse(data));
					if (JSON.parse(data.success)) {
						// update this.blogPosts
						this_.blogPosts = JSON.parse(data.posts);
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed delete");
					if (callback) callback();
				}
				);
		})(this);
	}

}
