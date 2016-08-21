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
var ProfileService_1 = require('./ProfileService');
var MessageService_1 = require('./MessageService');
var UtilsService_1 = require('./UtilsService');
var AccountService = (function () {
    function AccountService(http, utilsService, profileService, messageService) {
        this.http = http;
        this.profileService = profileService;
        this.messageService = messageService;
        this.utilsService = utilsService;
        this.loggedIn = false;
        this.updateLoginStatus();
    }
    AccountService.prototype.updateLoginStatus = function () {
        console.log("UPDATE LOGIN STATUS");
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.get(global.basePath + '/api/login')
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                this_.loggedIn = data.loggedIn;
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("done checking login status, loggedIn: " + this_.loggedIn);
            });
        })(this);
    };
    AccountService.prototype.mockLogin = function () {
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.post(global.basePath + '/api/login')
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                this_.loggedIn = data.loggedIn;
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("done logging in");
            });
        })(this);
    };
    AccountService.prototype.login = function (event) {
        event.preventDefault();
        var email = $("#user-email").val();
        var password = $("#user-password").val();
        // if credentials match account user's, log in
        this.profileService.getProfile(function () {
            var pw = "encrypt password";
            var storedPW = "decrypt this.profileService.profile.password";
            if (email == this.profileService.profile.email && pw == storedPW) {
                var tryCount = 0;
                (function tryRequest(this_) {
                    this_.http.post(global.basePath + '/api/login')
                        .subscribe(function (data) {
                        var data = JSON.parse(data._body);
                        console.log(data);
                        this_.loggedIn = data.loggedIn;
                    }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                        console.log("done logging in");
                    });
                })(this);
            }
        }.bind(this));
    };
    AccountService.prototype.logout = function () {
        console.log("TRYING TO LOGOUT");
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.get(global.basePath + '/api/logout')
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                this_.loggedIn = data.loggedIn;
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("logged out");
            });
        })(this);
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UtilsService_1.UtilsService, ProfileService_1.ProfileService, MessageService_1.MessageService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=AccountService.js.map