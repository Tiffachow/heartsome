/// <reference path="../../vendor.d.ts"/>
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var MessageService_1 = require('./MessageService');
var UtilsService_1 = require('./UtilsService');
var ProfileService = (function () {
    function ProfileService(http, messageService, utilsService) {
        this.http = http;
        this.messageService = messageService;
        this.utilsService = utilsService;
        this.profile = {
            id: 1,
            firstName: "Tiffany",
            lastName: "Chow",
            title: "Web Developer",
            location: "New York City",
            email: "tiffachow@gmail.com",
            websites: ["heartso.me"],
            about: "Blah",
            images: [],
            dob: new Date(),
            forHire: true,
            skills: [
                {
                    type: "language",
                    name: "javascript",
                    experience: "2 years",
                    proficiency: "advanced",
                    works: ["heartsome"],
                }
            ],
            createdAt: new Date(),
            password: "censored"
        };
    }
    ProfileService.prototype.getProfile = function (callback) {
        console.log("TRYING TO GET PROFILE");
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.get(global.basePath + '/api/profile')
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.profile = data.profile;
                }
                else {
                    console.log("Error getting profile");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed get profile");
                if (callback)
                    callback(this_.profile);
                return this_.profile;
            });
        })(this);
    };
    ProfileService.prototype.edit = function (body, callback) {
        console.log("TRYING TO EDIT POST WITH DATA " + JSON.stringify(body));
        var tryCount = 0;
        (function tryRequest(this_) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            this_.http.put(global.basePath + '/api/profile', body, options)
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.profile = data.profile;
                }
                else {
                    console.log("Error getting profile");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed put profile");
                if (callback)
                    callback(this_.profile);
                return this_.profile;
            });
        })(this);
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, MessageService_1.MessageService, UtilsService_1.UtilsService])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=ProfileService.js.map