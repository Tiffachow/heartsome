/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {UtilsService} from './UtilsService';

@Injectable()
export class BlogPostsService {
	blogPosts: Array<object> = [];

	constructor(
		private http: Http,
		private utilsService: UtilsService
	) {}

	create(body, callback) {
		console.log("TRYING TO CREATE NEW POST WITH DATA "+JSON.stringify(body));
		var tryCount = 0;
		(function tryRequest(this_) {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this_.http.post(global.basePath + '/api/blog/new', body, options)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.blogPosts = parsedData["posts"];
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed post");
					var result = this_.blogPosts[this_.blogPosts.length - 1];
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	getAll(sortDate, filterTag, filterCategory, callback) {
		console.log("TRYING TO GET ALL POSTS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/blog/all')
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.blogPosts = parsedData["posts"];
						console.log(parsedData["posts"]);
					} else {
						console.log("Error getting all blog posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get all blog posts");
					if (callback) callback(this_.blogPosts);
					return this_.blogPosts;
				}
				);
		})(this);
	}

	getOne(id, callback) {
		console.log("TRYING TO GET POST WITH ID "+id);
		var tryCount = 0;
		var result;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/blog/post/'+id)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						result = parsedData.post;
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

	edit(body, id, callback) {
		console.log("TRYING TO EDIT POST WITH DATA "+JSON.stringify(body));
		var tryCount = 0;
		(function tryRequest(this_) {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this_.http.put(global.basePath + '/api/blog/post/'+id, body, options)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.blogPosts = parsedData["posts"];
					} else {
						console.log("Error getting all posts");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed put");
					var result;
					for (var i in this_.blogPosts){
						if (this_.blogPosts[i]["id"] == id) {
							result = this_.blogPosts[i];
						}
					}
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	delete(id, callback) {
		console.log("TRYING TO DELETE POST WITH ID "+id);
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.delete(global.basePath + '/api/blog/post/'+id)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.blogPosts = parsedData["posts"];
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
