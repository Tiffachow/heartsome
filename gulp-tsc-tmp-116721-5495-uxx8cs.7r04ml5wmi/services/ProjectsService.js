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
var UtilsService_1 = require('./UtilsService');
var ProjectsService = (function () {
    function ProjectsService(http, utilsService) {
        this.http = http;
        this.utilsService = utilsService;
        this.projects = [];
    }
    ProjectsService.prototype.create = function (body, callback) {
        console.log("TRYING TO CREATE NEW PROJECT WITH DATA " + JSON.stringify(body));
        var tryCount = 0;
        (function tryRequest(this_) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            this_.http.post(global.basePath + '/api/projects/new', body, options)
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.projects = data.projects;
                }
                else {
                    console.log("Error getting all projects");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed new project");
                var result = this_.projects[this_.projects.length - 1];
                if (callback)
                    callback(result);
                return result;
            });
        })(this);
    };
    ProjectsService.prototype.getAll = function (sortDate, filterTag, filterCategory, callback) {
        console.log("TRYING TO GET ALL PROJECTS");
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.get(global.basePath + '/api/projects/all')
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.projects = data.projects;
                    console.log(data.projects);
                }
                else {
                    console.log("Error getting all projects");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed get all projects");
                if (callback)
                    callback(this_.projects);
                return this_.projects;
            });
        })(this);
    };
    ProjectsService.prototype.playRoulette = function () {
        return this.projects[Math.floor(Math.random() * this.projects.length)];
    };
    ProjectsService.prototype.getOne = function (id, callback) {
        console.log("TRYING TO GET PROJECT WITH ID " + id);
        var tryCount = 0;
        var result;
        (function tryRequest(this_) {
            this_.http.get(global.basePath + '/api/projects/project/' + id)
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    result = data.project;
                }
                else {
                    console.log("Error getting project");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed get one");
                if (callback)
                    callback(result);
                return result;
            });
        })(this);
    };
    ProjectsService.prototype.edit = function (body, id, callback) {
        console.log("TRYING TO EDIT PROJECT WITH DATA " + JSON.stringify(body));
        var tryCount = 0;
        (function tryRequest(this_) {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            this_.http.put(global.basePath + '/api/projects/project/' + id, body, options)
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.projects = data.projects;
                }
                else {
                    console.log("Error getting all projects");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed put");
                var result;
                for (var i in this_.projects) {
                    if (this_.projects[i]._id == id) {
                        result = this_.projects[i];
                    }
                }
                if (callback)
                    callback(result);
                return result;
            });
        })(this);
    };
    ProjectsService.prototype.delete = function (id, callback) {
        console.log("TRYING TO DELETE PROJECT WITH ID " + id);
        var tryCount = 0;
        (function tryRequest(this_) {
            this_.http.delete(global.basePath + '/api/projects/project/' + id)
                .subscribe(function (data) {
                var data = JSON.parse(data._body);
                console.log(data);
                if (data.success) {
                    this_.projects = data.projects;
                }
                else {
                    console.log("Error getting all projects");
                }
            }, function (err) { tryCount++; this_.utilsService.retryRequest(err, tryCount, tryRequest, this_, true); }, function () {
                console.log("completed delete");
                if (callback)
                    callback();
            });
        })(this);
    };
    ProjectsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UtilsService_1.UtilsService])
    ], ProjectsService);
    return ProjectsService;
}());
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=ProjectsService.js.map