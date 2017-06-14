/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

	constructor() {
	}

	shuffle(array) {
		var i = 0
			, j = 0
			, temp = null;

		for (i = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	filter(collection) {
		var col = {};
		for (var i in collection) {
			if (collection[i] !== null) {
				col[i] = collection[i];
			}
		}
		return col;
	}

	onlyUnique(collection, property) {
		var results = [];
		var hash, propertyCollection, len, eleProp;
		//Callback function to filter out unique id numbers
		var findUniqueIds = function(val) {
			var counter = 0;
			for (var i = 0; i < propertyCollection.length; i++) {
				if (val === propertyCollection[i]) {
					counter++;
				}
			}
			if (counter < 2) {
				return val;
			}
		};
		//Collect an array of ids
		propertyCollection = collection.map(function(obj) { return obj[property] });
		len = collection.length;
		//Filter out duplicate ids
		propertyCollection = propertyCollection.filter(findUniqueIds);
		//Turn ids into a hash table
		hash = propertyCollection.reduce(function(o, v, i) {
			o[v] = 1;
			return o;
		}, {});
		for (var i = 0; i < collection.length; i++) {
			eleProp = collection[i][property];
			//Go through each element, and find unique ids
			if (hash[eleProp] === 1) {
				//Push unique ids to results
				results.push(collection[i]);
			}
		}
		return results;
	}

	retryRequest(err, tryCount, request, thisVar?, fourthTime?) {
		console.log("REQUEST FAILED. Error: " + err);
		setTimeout(function(){
			if (tryCount <= 3) {
				console.log("TRYING AGAIN AFTER 1 SEC DELAY... TRY #"+tryCount);
				request(thisVar);
			} else if (fourthTime && tryCount == 4) {
				setTimeout(function(){
					console.log("TRYING AGAIN AFTER 40 SECS... TRY #"+tryCount);
					request(thisVar);
				}, 39000);
			}
		}, 1000);
	}

}