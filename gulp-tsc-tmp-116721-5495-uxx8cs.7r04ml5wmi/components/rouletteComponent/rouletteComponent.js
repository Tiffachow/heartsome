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
/// <reference path="../../../vendor.d.ts"/>
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var MessageService_1 = require('./../../services/MessageService');
var VersionsService_1 = require('./../../services/VersionsService');
var ProjectsService_1 = require('./../../services/ProjectsService');
// Import all versions components here
var baseComponent_1 = require('./../../version-cubic/components/baseComponent/baseComponent');
var baseComponent_2 = require('./../../version-material/components/baseComponent/baseComponent');
var baseComponent_3 = require('./../../version-typography/components/baseComponent/baseComponent');
// Import all projects components here
var RouletteComponent = (function () {
    // Constructor
    function RouletteComponent(messageService, versionsService, projectsService, router, route) {
        this.messageService = messageService;
        this.messageSubscription;
        this.versionsService = versionsService;
        this.projectsService = projectsService;
        this.router = router;
        this.route = route;
        this.type = this.route.params["type"] || "versions";
        this.alreadyInit = false;
    }
    // Functions
    RouletteComponent.prototype.subscribeToMessageService = function () {
        var _this = this;
        this.messageSubscription = this.messageService.message$.subscribe(function (message) {
            switch (message["name"]) {
                case "activateRoulette":
                    if (_this.alreadyInit) {
                        _this.playRoulette();
                    }
                    break;
            }
        });
    };
    RouletteComponent.prototype.ngOnInit = function () {
        this.subscribeToMessageService();
        this.playRoulette();
    };
    RouletteComponent.prototype.playRoulette = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.type = params['type'] || "versions";
        });
        console.log("Roulette type: " + this.type);
        if (this.type == "versions") {
            this.version = this.versionsService.playRoulette();
            console.log("Roulette version: " + this.version["name"]);
        }
        else if (this.type == "projects") {
            this.project = this.projectsService.playRoulette();
            if (this.project) {
                console.log("Roulette project: " + this.project["title"]);
            }
            else {
                console.log("No projects");
            }
        }
        this.alreadyInit = true;
    };
    RouletteComponent.prototype.ngOnChanges = function () {
        // console.log("changes");
    };
    RouletteComponent.prototype.ngDoCheck = function () {
        // console.log("do check");
    };
    RouletteComponent.prototype.ngAfterContentInit = function () {
        // console.log("AfterContentInit");
    };
    RouletteComponent.prototype.ngAfterContentChecked = function () {
        // console.log("AfterContentChecked");
    };
    RouletteComponent.prototype.ngAfterViewInit = function () {
        // console.log("AfterViewInit");
    };
    RouletteComponent.prototype.ngAfterViewChecked = function () {
        // console.log("AfterViewChecked");
    };
    RouletteComponent.prototype.ngOnDestroy = function () {
        this.messageSubscription.unsubscribe();
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    RouletteComponent = __decorate([
        core_1.Component({
            selector: 'roulette',
            styles: [],
            directives: [common_1.CORE_DIRECTIVES,
                // add all project components & version components here
                baseComponent_1.VersionCubicComponent, baseComponent_2.VersionMaterialComponent, baseComponent_3.VersionTypographyComponent
            ],
            templateUrl: '/client/app/components/rouletteComponent/rouletteComponent.html'
        }), 
        __metadata('design:paramtypes', [MessageService_1.MessageService, VersionsService_1.VersionsService, ProjectsService_1.ProjectsService, router_1.Router, router_1.ActivatedRoute])
    ], RouletteComponent);
    return RouletteComponent;
}());
exports.RouletteComponent = RouletteComponent;
//# sourceMappingURL=rouletteComponent.js.map