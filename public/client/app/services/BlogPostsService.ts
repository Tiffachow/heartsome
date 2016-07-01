/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class BlogPostsService {
	blogPosts: Array<Object>;

	constructor() {
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
		console.log("CREATED NEW POST WITH DATA "+JSON.stringify(data));
		// update this.blogPosts
		var result = this.blogPosts[2];
		if (callback) callback(result);
		return result;
	}

	getAll(sortDate?, filterTag?, filterCategory?, callback?) {
		// var result = [];
		// return result;
		// update this.blogPosts;
		var results = this.blogPosts;
		if (callback) callback(results);
		return results;
	}

	getOne(id, callback?) {
		var result;
		for (var i in this.blogPosts){
			if (this.blogPosts[i].id == id) {
				result = this.blogPosts[i];
			}
		}
		if (callback) callback(result);
		return result;
	}

	edit(data, id, callback?) {
		// callback on success
		console.log("EDITED POST WITH ID "+id);
		var result;
		for (var i in this.blogPosts){
			if (this.blogPosts[i].id == id) {
				result = this.blogPosts[i];
			}
		}
		if (callback) callback(result);
		return result;
	}

	delete(id, callback?) {
		console.log("DELETED POST WITH ID "+id);
		if (callback) callback();
	}

}
