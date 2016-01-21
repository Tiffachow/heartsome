/// <reference path="../references.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core'); //beta
var common_1 = require('angular2/common'); //beta
var FirstComponent = (function () {
    // Constructor
    function FirstComponent() {
    }
    // Functions
    FirstComponent.prototype.ngAfterViewInit = function () {
    };
    FirstComponent = __decorate([
        //beta
        core_1.Component({
            selector: 'component',
            styles: [],
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            templateUrl: '/src/app/components/component1/component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], FirstComponent);
    return FirstComponent;
})();
exports.FirstComponent = FirstComponent;
// $(function(){
// 	//
// }) 
//# sourceMappingURL=component.js.map