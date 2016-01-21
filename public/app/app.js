var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var CombineComponents = (function () {
    function CombineComponents() {
    }
    CombineComponents.prototype.ngOnInit = function () { };
    CombineComponents = __decorate([
        core_1.Component({
            selector: 'app',
            template: "<component></component>",
        }), 
        __metadata('design:paramtypes', [])
    ], CombineComponents);
    return CombineComponents;
})();
exports.CombineComponents = CombineComponents;
browser_1.bootstrap(CombineComponents, []).catch(function (err) { return console.error(err); }); //services injected here are singletons available app-wide
//# sourceMappingURL=app.js.map