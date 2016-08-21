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
/// <reference path="../../../../vendor.d.ts"/>
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var MessageService_1 = require('./../../../services/MessageService');
var ProjectsService_1 = require('./../../../services/ProjectsService');
// import all projects components here
var ProjectComponent = (function () {
    // Constructor
    function ProjectComponent(messageService, projectsService, router, route) {
        this.router = router;
        this.route = route;
        this.projectName = this.route.params["name"];
        this.messageService = messageService;
        this.projectsService = projectsService;
    }
    // Functions
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.projectName = params['name'];
        });
        console.log("Selected project: " + this.projectName);
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    ProjectComponent.prototype.ngAfterViewInit = function () {
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            styles: [],
            directives: [
                common_1.CORE_DIRECTIVES,
            ],
            templateUrl: '/client/app/projects/components/baseComponent/baseComponent.html',
        }), 
        __metadata('design:paramtypes', [MessageService_1.MessageService, ProjectsService_1.ProjectsService, router_1.Router, router_1.ActivatedRoute])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=baseComponent.js.map