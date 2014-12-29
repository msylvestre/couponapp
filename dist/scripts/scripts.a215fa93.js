"use strict";angular.module("yeoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.sortable","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("Betsy")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("yeoApp").controller("MainCtrl",["$scope","localStorageService",function(a,b){function c(){a.itemPriceTotal=0,a.couponWorthTotal=0;for(var b=0;b<a.coupons.length;b++)a.itemPriceTotal+=a.coupons[b].itemPriceTotal,a.couponWorthTotal+=a.coupons[b].couponWorthTotal}function d(a){return a*f}function e(){for(var b=0,c=0;c<a.coupons.length;c++)a.coupons[c].id>b&&(b=a.coupons[c].id);return b+1}var f=1.155,g=b.get("coupons"),h=0;a.coupons=g||[],a.$watch("coupons",function(){b.set("coupons",a.coupons),c()},!0),a.saveCoupon=function(){var b=a.itemQty*a.itemPrice;if(a.isTax&&(b=d(b)),console.log("$scope.id: "+a.id),void 0===a.id||""===a.id){var c={id:e(),itemName:a.itemName,itemQty:a.itemQty,itemPrice:a.itemPrice,isTax:a.isTax,itemPriceTotal:b,couponWorth:a.couponWorth,couponQty:a.couponQty,couponWorthTotal:a.couponWorth*a.couponQty,itemTotalPriceSaving:b-a.couponWorth*a.couponQty};a.coupons.push(c)}else console.log("$index and save edit: "+h),a.coupons[h].itemName=a.itemName,a.coupons[h].itemQty=a.itemQty,a.coupons[h].itemPrice=a.itemPrice,a.coupons[h].isTax=a.isTax,a.coupons[h].itemPriceTotal=b,a.coupons[h].couponWorth=a.couponWorth,a.coupons[h].couponQty=a.couponQty,a.coupons[h].couponWorthTotal=a.couponWorth*a.couponQty,a.coupons[h].itemTotalPriceSaving=b-a.couponWorth*a.couponQty;a.id="",a.itemName="",a.itemQty="",a.itemPrice="",a.isTax="",a.couponWorth="",a.couponQty=""},a.removeCoupon=function(b){a.coupons.splice(b,1)},a.detailCoupon=function(b){h=b,a.id=a.coupons[b].id,a.itemName=a.coupons[b].itemName,a.itemQty=a.coupons[b].itemQty,a.itemPrice=a.coupons[b].itemPrice,a.isTax=a.coupons[b].isTax,a.couponWorth=a.coupons[b].couponWorth,a.couponQty=a.coupons[b].couponQty}}]),angular.module("yeoApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("yeoApp").controller("ContactCtrl",["$scope",function(a){a.contact="Synergy Consultant"}]);