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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var VersionsService_1 = require('./../../services/VersionsService');
var baseComponent_1 = require('./../../version-cubic/components/baseComponent/baseComponent');
var baseComponent_2 = require('./../../version-material/components/baseComponent/baseComponent');
var baseComponent_3 = require('./../../version-typography/components/baseComponent/baseComponent');
var VersionsContainerComponent = (function () {
    // Constructor
    function VersionsContainerComponent(versionsService, router, route) {
        this.versionsService = versionsService;
        this.router = router;
        this.route = route;
        this.version = this.route.params["version"];
    }
    // Functions
    VersionsContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.version = params['version'];
        });
        console.log("Selected version: " + this.version);
    };
    VersionsContainerComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    VersionsContainerComponent.prototype.ngAfterViewInit = function () {
    };
    VersionsContainerComponent = __decorate([
        core_1.Component({
            selector: 'versions-container',
            styles: [],
            directives: [common_1.CORE_DIRECTIVES, baseComponent_1.VersionCubicComponent, baseComponent_2.VersionMaterialComponent, baseComponent_3.VersionTypographyComponent],
            templateUrl: '/client/app/components/versionsContainerComponent/versionsContainerComponent.html',
        }), 
        __metadata('design:paramtypes', [VersionsService_1.VersionsService, router_1.Router, router_1.ActivatedRoute])
    ], VersionsContainerComponent);
    return VersionsContainerComponent;
}());
exports.VersionsContainerComponent = VersionsContainerComponent;
//# sourceMappingURL=versionsContainerComponent.js.map