/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class TagSuggestService {

	constructor() {
	}

	create(data, callback?) {
		var result = {};
		return result;
	}

	getStoredTags(type, callback?) { //types: blogTag, blogCategory, projectTech, versionTag
		var result = [];
		return result;
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