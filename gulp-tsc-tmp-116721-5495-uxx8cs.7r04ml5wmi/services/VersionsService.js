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
var VersionsService = (function () {
    function VersionsService() {
        this.versions = [
            {
                id: 1,
                name: "cubic",
                description: "cubic",
                timeSpent: "2 weeks",
                private: false,
                tags: ["geometry"],
                link: "/v/app;version=cubic",
                createdAt: new Date()
            },
            {
                id: 2,
                name: "material",
                description: "google material design standards",
                timeSpent: "1 month",
                private: false,
                tags: ["geometry", "web design"],
                link: "/v/app;version=material",
                createdAt: new Date()
            },
            {
                id: 3,
                name: "typography",
                description: "typography",
                timeSpent: "2 weeks",
                private: false,
                tags: ["web design"],
                link: "/v/app;version=typography",
                createdAt: new Date()
            },
        ];
    }
    VersionsService.prototype.create = function (data, callback) {
        var result = {};
        return result;
    };
    VersionsService.prototype.getAll = function (sortDate, filterTag, callback) {
        // in callback to API request on complete:
        var result = [];
        return result;
    };
    VersionsService.prototype.playRoulette = function () {
        return this.versions[Math.floor(Math.random() * this.versions.length)];
    };
    VersionsService.prototype.getOne = function (id, callback) {
        var result = {};
        return result;
    };
    VersionsService.prototype.edit = function (data, id, callback) {
        // callback on success
        var result = {};
        return result;
    };
    VersionsService.prototype.delete = function (id, callback) {
    };
    VersionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VersionsService);
    return VersionsService;
}());
exports.VersionsService = VersionsService;
//# sourceMappingURL=VersionsService.js.map