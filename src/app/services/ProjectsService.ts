/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {UtilsService} from './UtilsService';

@Injectable()
export class ProjectsService {
	projects: Array<object> = [
		{
			id:                            1,
			contributors:                  [{
				name:                 		"Tiffany Chow",
				link:                   	"heartso.me",
			}],
			builtFor:                      [{
				name:                  		"Tiffany Chow",
				link:                  		"heartso.me",
			}],
			title:                          "download wishlist ebooks",
			link: 							"//heartso.me/project/download wishlist ebooks",
			github: 						"",
			componentName: 					"download-wishlist-ebooks",
			description:                    "",
			tech:                           [],
			images:                         [],
			videos:                         [],
			date:                           new Date("August 24, 2016"),
			private:                        false,
			timeSpent:                      "3 hours",
			createdAt:                      new Date(),
		}
	];

	constructor(
		private http: Http,
		private utilsService: UtilsService
	) {}

	create(body, callback) {
		console.log("TRYING TO CREATE NEW PROJECT WITH DATA "+JSON.stringify(body));
		var tryCount = 0;
		(function tryRequest(this_) {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this_.http.post(global.basePath + '/api/projects/new', body, options)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.projects = parsedData["projects"];
					} else {
						console.log("Error getting all projects");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed new project");
					var result = this_.projects[this_.projects.length - 1];
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	getAll(sortDate, filterTag, filterCategory, callback) {
		console.log("TRYING TO GET ALL PROJECTS");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/projects/all')
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.projects = parsedData["projects"].length > 0 ? parsedData["projects"] : this_.projects;
						console.log(this_.projects);
					} else {
						console.log("Error getting all projects");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get all projects");
					if (callback) callback(this_.projects);
					return this_.projects;
				}
				);
		})(this);
	}

	playRoulette() {
		return this.projects[ Math.floor( Math.random() * this.projects.length ) ];
	}

	getOne(id, callback) {
		console.log("TRYING TO GET PROJECT WITH ID "+id);
		var tryCount = 0;
		var result;
		(function tryRequest(this_) {
			this_.http.get(global.basePath + '/api/projects/project/'+id)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						result = parsedData.project;
					} else {
						console.log("Error getting project");
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
		console.log("TRYING TO EDIT PROJECT WITH DATA "+JSON.stringify(body));
		var tryCount = 0;
		(function tryRequest(this_) {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			this_.http.put(global.basePath + '/api/projects/project/'+id, body, options)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.projects = parsedData["projects"];
					} else {
						console.log("Error getting all projects");
					}
				},
				err => { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed put");
					var result;
					for (var i in this_.projects){
						if (this_.projects[i]["_id"] == id) {
							result = this_.projects[i];
						}
					}
					if (callback) callback(result);
					return result;
				}
				);
		})(this);
	}

	delete(id, callback) {
		console.log("TRYING TO DELETE PROJECT WITH ID "+id);
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.delete(global.basePath + '/api/projects/project/'+id)
				.subscribe(
				data => {
					var parsedData = JSON.parse(data["_body"]);
					console.log(parsedData);
					if (parsedData["success"]) {
						this_.projects = parsedData["projects"];
					} else {
						console.log("Error getting all projects");
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
