'use strict'; 
 
angular.module('BetsyApp') 

  .controller('MainCtrl', function ($scope, $http, localStorageService, CategoriesData, ItemsData) {

    $scope.$watch(function () 
      { return CategoriesData.getCategories(); }, function (newValue) {
        if (newValue) {
          $scope.categories = newValue;
        }        
    });  
 
    $scope.$watch(function () {return ItemsData.getItems(); }, 
      function (newValue) {
        if (newValue) {
          $scope.items = newValue;
        }        
      }
    );  

    $scope.removeItem = function(id) {
      ItemsData.removeItem(id);
    };

    $scope.setDetailItem = function(index) {
      ItemsData.setDetailItem(index);
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