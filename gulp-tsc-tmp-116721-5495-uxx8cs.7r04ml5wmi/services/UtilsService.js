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
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.prototype.shuffle = function (array) {
        var i = 0, j = 0, temp = null;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    UtilsService.prototype.filter = function (collection) {
        var col = {};
        for (var i in collection) {
            if (collection[i] !== null) {
                col[i] = collection[i];
            }
        }
        return col;
    };
    UtilsService.prototype.onlyUnique = function (collection, property) {
        var results = [];
        var hash, propertyCollection, len, eleProp;
        //Callback function to filter out unique id numbers
        var findUniqueIds = function (val) {
            var counter = 0;
            for (var i = 0; i < propertyCollection.length; i++) {
                if (val === propertyCollection[i]) {
                    counter++;
                }
            }
            if (counter < 2) {
                return val;
            }
        };
        //Collect an array of ids
        propertyCollection = collection.map(function (obj) { return obj[property]; });
        len = collection.length;
        //Filter out duplicate ids
        propertyCollection = propertyCollection.filter(findUniqueIds);
        //Turn ids into a hash table
        hash = propertyCollection.reduce(function (o, v, i) {
            o[v] = 1;
            return o;
        }, {});
        for (var i = 0; i < collection.length; i++) {
            eleProp = collection[i][property];
            //Go through each element, and find unique ids
            if (hash[eleProp] === 1) {
                //Push unique ids to results
                results.push(collection[i]);
            }
        }
        return results;
    };
    UtilsService.prototype.retryRequest = function (err, tryCount, request, thisVar, fourthTime) {
        console.log("REQUEST FAILED. Error: " + err);
        setTimeout(function () {
            if (tryCount <= 3) {
                console.log("TRYING AGAIN AFTER 1 SEC DELAY... TRY #" + tryCount);
                request(thisVar);
            }
            else if (fourthTime && tryCount == 4) {
                setTimeout(function () {
                    console.log("TRYING AGAIN AFTER 40 SECS... TRY #" + tryCount);
                    request(thisVar);
                }, 39000);
            }
        }, 1000);
    };
    UtilsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UtilsService);
    return UtilsService;
}());
exports.UtilsService = UtilsService;
//# sourceMappingURL=UtilsService.js.map