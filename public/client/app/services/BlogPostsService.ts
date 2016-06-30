/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class BlogPostsService {
	blogPosts: Array<Object>;

	constructor() {
		this.blogPosts = [ //mock? retrieve from mongoDB later
			{
				id: 1,
				authors: {
					name: "Tiffany Chow",
					link: null
				},
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				images: [],
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 2,
				authors: {
					name: "Tiffany Chow",
					link: null
				},
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				images: [],
				private: false,
				tags: [],
				categories: [],
				views: 0,
				shares: 0,
				createdAt: new Date()
			},
			{
				id: 3,
				authors: {
					name: "Tiffany Chow",
					link: null
				},
				title: "Revamping Heartsome",
				description: "the process",
				tldr: null,
				body: "baisubc;asuc;uai iabsi; asbdi",
				images: [],
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
	}

	getAll(sortDate?, filterTag?, filterCategory?, callback?) {
	}

	getOne(id, callback?) {
	}

	edit(data, id, callback?) {
		// callback on success
	}

	delete(id, callback?) {
	}

}
