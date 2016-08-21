/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class TagSuggestService {
	tags: Array<Object>;

	constructor() {
		this.tags = [ //mock
			{
				id: 1,
				name: "angular2",
				type: "blogTag",
				createdAt: new Date()
			},
			{
				id: 2,
				name: "nodejs",
				type: "blogTag",
				createdAt: new Date()
			},
			{
				id: 3,
				name: "website",
				type: "blogTag",
				createdAt: new Date()
			},
		];
	}

	create(data, callback?) {
		var result = {};
		return result;
	}

	getAll(callback?) {

	}

	getStoredTags(type, callback?) { //types: blogTag, blogCategory, projectTech, versionTag
		var results = [];
		for (var x in this.tags) {
			if (this.tags[x]["type"] == type) {
				results.push(this.tags[x]["name"]);
			}
		}
		if (callback) callback(results);
		return results;
	}

	edit(data, callback?) {
		// callback on success
		var result = {};
		return result;
	}

	delete(data, callback?) {
	}

	initTagSuggestOnInput(inputId, type) { //types: blogTag, blogCategory, projectTech, versionTag
		var jsonData = [];
		this.getStoredTags(type, function(storedTags){
			for (var i = 0; i < storedTags.length; i++) jsonData.push({
				id: i,
				name: storedTags[i]
			});
			var inputWithTagSuggest = $('#'+inputId).tagSuggest({
				data: jsonData,
				sortOrder: 'name',
				maxDropHeight: 200,
				name: inputId
			});
			return inputWithTagSuggest;
		}.bind(this));
	}

	getInputTags(inputId) {
		return $("input[name='"+inputId+"']").val();
	}

}