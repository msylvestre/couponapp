"use strict";angular.module("BetsyApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.sortable","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("Betsy")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("BetsyApp").controller("MainCtrl",["$scope","localStorageService",function(a,b){function c(){for(var b=0,c=0;c<a.items.length;c++)a.items[c].id>b&&(b=a.items[c].id);return b+1}function d(){a.getTotalItemsPrice(),a.getTotalCouponsWorth(),a.getTotalAmountToPay()}a.$watch("items",function(){b.set("items",a.items),d()},!0),a.cleanForm=function(){a.id="",a.itemName="",a.itemQty="",a.itemPrice="",a.isTax=!1,a.couponWorth="",a.couponQty="",a.itemNotes=""},a.saveItem=function(){if(void 0===a.id||""===a.id){var b={id:c(),itemName:a.itemName,itemQty:a.itemQty||0,itemPrice:a.itemPrice||0,isTax:a.isTax,couponWorth:a.couponWorth||0,couponQty:a.couponQty||0,couponWorthTotal:a.couponWorth*a.couponQty||0,itemNotes:a.itemNotes};a.items.push(b)}else a.items[f].itemName=a.itemName,a.items[f].itemQty=a.itemQty,a.items[f].itemPrice=a.itemPrice,a.items[f].isTax=a.isTax,a.items[f].couponWorth=a.couponWorth,a.items[f].couponQty=a.couponQty,a.items[f].couponWorthTotal=a.couponWorth*a.couponQty,a.items[f].itemNotes=a.itemNotes;a.cleanForm()},a.removeItem=function(b){a.items.splice(b,1)},a.getDetailItem=function(b){f=b,a.id=a.items[b].id,a.itemName=a.items[b].itemName,a.itemQty=a.items[b].itemQty,a.itemPrice=a.items[b].itemPrice,a.isTax=a.items[b].isTax,a.couponWorth=a.items[b].couponWorth,a.couponQty=a.items[b].couponQty,a.itemNotes=a.items[b].itemNotes},a.addTax=function(b,c){return c?b*a.taxPercentage:b},a.getTotalPrice=function(){var b=a.itemQty*a.addTax(a.itemPrice,a.isTax)-a.couponQty*a.couponWorth;return b||0},a.getPricePerItem=function(){var b=(a.itemQty*a.addTax(a.itemPrice,a.isTax)-a.couponQty*a.couponWorth)/a.itemQty;return b||0},a.getTotalItemsPrice=function(){for(var b=0,c=0;c<a.items.length;c++)b+=a.addTax(a.items[c].itemQty*a.items[c].itemPrice,a.items[c].isTax);return b||0},a.getTotalCouponsWorth=function(){for(var b=0,c=0;c<a.items.length;c++)b+=a.items[c].couponWorthTotal;return a.amountToPay=a.itemsPriceTotal-a.couponsWorthTotal,b||0},a.getTotalAmountToPay=function(){return a.getTotalItemsPrice()-a.getTotalCouponsWorth()||0},a.taxPercentage=1.14975;var e=b.get("items"),f=0;a.items=e||[],a.cleanForm(),a.getTotalItemsPrice()}]),angular.module("BetsyApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("BetsyApp").controller("ContactCtrl",["$scope",function(a){a.contact="Synergy Consultant"}]);