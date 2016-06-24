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
/// <reference path="../vendor.d.ts"/>
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_2 = require('@angular/core');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var baseComponent_1 = require('./components/baseComponent/baseComponent');
var CombineComponents = (function () {
    function CombineComponents() {
    }
    CombineComponents.prototype.ngOnInit = function () {
    };
    CombineComponents = __decorate([
        core_2.Component({
            selector: 'app',
            template: "\n\t\t<prime-player [ngClass]=\"{debug:debug}\"></prime-player>\n\t\t<button class=\"debug-btn\" (click)=\"debug=!debug\">DEBUG</button>\n\t",
            directives: [baseComponent_1.BaseComponent, router_deprecated_1.ROUTER_DIRECTIVES, router_deprecated_1.RouterLink, router_deprecated_1.RouterOutlet]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', redirectTo: ['Home'] },
            { path: '/home', component: baseComponent_1.BaseComponent, name: 'Home' },
        ]), 
        __metadata('design:paramtypes', [])
    ], CombineComponents);
    return CombineComponents;
}());
exports.CombineComponents = CombineComponents;
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(CombineComponents, [http_1.JSONP_PROVIDERS, http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, core_2.provide(common_1.APP_BASE_HREF, { useValue: "/" })]).catch(function (err) { return console.error(err); }); //services injected here are singletons available app-wide
//# sourceMappingURL=app.js.map