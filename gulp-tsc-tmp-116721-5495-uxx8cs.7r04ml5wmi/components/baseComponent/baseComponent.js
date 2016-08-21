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
var BaseComponent = (function () {
    // Constructor
    function BaseComponent() {
    }
    // Functions
    BaseComponent.prototype.ngOnInit = function () {
        console.log("NEW BASE > ROUTER OUTLET COMPONENT");
    };
    BaseComponent.prototype.ngAfterViewInit = function () {
    };
    BaseComponent = __decorate([
        core_1.Component({
            selector: 'base-component',
            styles: [],
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            templateUrl: '/client/app/components/baseComponent/baseComponent.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BaseComponent);
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=baseComponent.js.map