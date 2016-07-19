/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class S3Service {
	http: Http;
	loading: Boolean;

	constructor(http: Http) {
		this.http = http;
		this.loading = false;
	}

	getS3SignedRequest(file, bucketFolder, inputID, previewID?) {
		console.log("TRYING TO GET SIGNED REQUEST");
		this.loading = true;
		var tryCount = 0,
		s3SignedRequest = {};
		(function tryRequest(this_) {
			var date = Number(new Date());
			this_.http.get("/api/sign-s3?file-name=" + bucketFolder + "/" + file.name + " - " + date +"&file-type=" + file.type)
				.subscribe(
				data => {
					var data = JSON.parse(data._body);
					console.log(data);
					if (data.success) {
						s3SignedRequest = data.s3SignedRequest;
					} else {
						console.log("Error getting signed URL from s3. Error: " + data.error);
					}
				},
				err => { console.log("API request for s3 signed request failed"); tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed get sign request from s3");
					this_.uploadFileToBucket(file, s3SignedRequest, inputID, previewID);
				}
				);
		})(this);
	}

	uploadFileToBucket(file, s3SignedRequest, inputID, previewID?) {
		console.log("TRYING TO UPLOAD FILE");
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.put(s3SignedRequest.signedRequest, file)
				.subscribe(
				data => {
					// var data = JSON.parse(data._body);
					console.log(data);
				},
				err => { console.log("Bucket upload failed"); tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed upload file: URL to access is: " + s3SignedRequest.url);
					$(inputID).val(s3SignedRequest.url);
					if (previewID) {
						$(previewID).attr("src",s3SignedRequest.url);
					}
					this_.loading = false;
				}
				);
		})(this);
	}

	deleteObjectFromS3Bucket(filename) {
		console.log("TRYING TO DELETE OBJECT " + filename);
		this.loading = true;
		var tryCount = 0;
		(function tryRequest(this_) {
			this_.http.delete("/api/s3-delete?file-name=" + filename)
				.subscribe(
				data => {
					var data = JSON.parse(data._body);
					console.log(data);
					if (data.success) {
						console.log("Deleted object");
					} else {
						console.log("Error getting signed URL from s3. Error: " + data.error);
					}
				},
				err => { console.log("API request for s3 signed request failed"); tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); },
				() => {
					console.log("completed delete object");
					this_.loading = false;
				}
				);
		})(this);
	}

}










