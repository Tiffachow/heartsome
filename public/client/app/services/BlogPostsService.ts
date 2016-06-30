/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class BlogPostsService {
	blogPosts: Array<Object>;

	constructor() {
		this.blogPosts = [ //mock? retrieve from mongoDB later
			{
				id: 1,
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: "/dist/images/defaultpostimg.png",
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 2,
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: "/dist/images/defaultpostimg.png",
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 3,
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				image: "/dist/images/defaultpostimg.png",
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
		// var result = {};
		// return result;
		callback();
		return this.blogPosts[2];
	}

	getAll(sortDate?, filterTag?, filterCategory?, callback?) {
		// var result = [];
		// return result;
		callback();
		return this.blogPosts;
	}

	getOne(id, callback?) {
		// var result = {};
		// return result;
		var result;
		console.log("GOT POST WITH ID "+id);
		for (var post in this.blogPosts){
			if (post.id == id) {
				result = post;
			}
		}
		console.log("result = "+result);
		callback(result);
		for (var post in this.blogPosts){
			if (post.id == id) return post;
		}
	}

	edit(data, id, callback?) {
		// callback on success
		console.log("EDITED POST WITH ID "+id);
		// var result = {};
		// return result;
		callback();
		for (var post in this.blogPosts){
			if (post.id == id) return post;
		}
	}

	delete(id, callback?) {
		console.log("DELETED POST WITH ID "+id);
		callback();
	}

}
