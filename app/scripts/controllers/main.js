'use strict'; 
 
angular.module('BetsyApp') 

  .controller('MainCtrl', function ($scope, $http, localStorageService, CategoriesData, ItemsData) {

    $scope.$watch(function () 
      { return CategoriesData.getCategories(); }, function (newValue) {
        if (newValue) {
          $scope.categories = newValue;
          console.log("WATCH getCategories");
        }        
    });  
 
    $scope.$watch(function () {return ItemsData.getItems(); }, 
      function (newValue) {
        if (newValue) {
          $scope.items = newValue;
          //return newValue;
          console.log("WATCH !!!!!!  getItems()"); 
        }        
      }
    );  

    $scope.removeItem = function(id) {
      ItemsData.removeItem(id);
    };

    $scope.setDetailItem = function(index) {
      ItemsData.setDetailItem2(index);
    };

    /////////////////////////////////////////  Private function /////////////////////////////////////////

    function updateReportData() {
      $scope.totalItemsPrice  = ItemsData.getTotalItemsPrice(); 
      $scope.totalCouponWorth = ItemsData.getTotalCouponsWorth();
      $scope.totalAmountToPay = ItemsData.getTotalAmountToPay();
    }

    /////////////////////////////////////////  Private function ///////////////////////////////////////// 


    /////////////////////////////////////////  Initialize /////////////////////////////////////////

    updateReportData();
  });