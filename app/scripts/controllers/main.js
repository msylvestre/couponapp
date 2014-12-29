'use strict';

angular.module('yeoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var taxPercentage = 1.155;
    var couponsInStore = localStorageService.get('coupons'); // Get local storage array "Betsy.coupons"
    var editIndex = 0;

    // Array of item
    $scope.coupons = couponsInStore || [];


    // FUNC: Watch when change happen in the "coupons" array and update the localstorage
    $scope.$watch('coupons', function () {

      // Update the local storage
      localStorageService.set('coupons', $scope.coupons);

      updateTotalReport();
    }, true);


    // FUNC: Add a coupon to the "coupons" array by creating a jason object.  Later will insert into a db
    $scope.saveCoupon = function () {

      var itemPriceTotal = $scope.itemQty * $scope.itemPrice;

      if ($scope.isTax) {
        itemPriceTotal = getTotalWithTax(itemPriceTotal);
      }

      console.log('$scope.id: ' + $scope.id);

      // Add new coupon
      if ($scope.id === undefined || $scope.id === '') {
        
        var myCoupon = {
          id: getNextId(),
          itemName: $scope.itemName,
          itemQty: $scope.itemQty || 0,
          itemPrice: $scope.itemPrice || 0,
          isTax: $scope.isTax,
          itemPriceTotal: itemPriceTotal || 0,
          couponWorth: $scope.couponWorth || 0,
          couponQty: $scope.couponQty || 0,
          couponWorthTotal: ($scope.couponWorth * $scope.couponQty) || 0,
          itemTotalPriceSaving: (itemPriceTotal - ($scope.couponWorth * $scope.couponQty)) || 0,
        };

        //alert("mycoupon.desc: " + myCoupon.desc);
        $scope.coupons.push(myCoupon);

      }
      else {  // Edit Coupon
        console.log('$index and save edit: ' + editIndex);

          $scope.coupons[editIndex].itemName        = $scope.itemName;
          $scope.coupons[editIndex].itemQty         = $scope.itemQty;
          $scope.coupons[editIndex].itemPrice       = $scope.itemPrice;
          $scope.coupons[editIndex].isTax           = $scope.isTax;
          $scope.coupons[editIndex].itemPriceTotal  = itemPriceTotal;
          $scope.coupons[editIndex].couponWorth     = $scope.couponWorth;
          $scope.coupons[editIndex].couponQty       = $scope.couponQty;
          $scope.coupons[editIndex].couponWorthTotal = $scope.couponWorth * $scope.couponQty;
          $scope.coupons[editIndex].itemTotalPriceSaving = itemPriceTotal - ($scope.couponWorth * $scope.couponQty);

      }

    };

    // FUNC: Remove a coupon from the "coupons" array.  Later will remove from the db
    $scope.removeCoupon = function (index) {
      $scope.coupons.splice(index, 1);
    };

    // FUNC: Load the detail in the view scope
    $scope.detailCoupon = function (index) {

      editIndex = index;
      $scope.id = $scope.coupons[index].id;
      $scope.itemName = $scope.coupons[index].itemName;
      $scope.itemQty = $scope.coupons[index].itemQty;
      $scope.itemPrice = $scope.coupons[index].itemPrice;
      $scope.isTax = $scope.coupons[index].isTax;
      $scope.couponWorth = $scope.coupons[index].couponWorth;
      $scope.couponQty = $scope.coupons[index].couponQty;

    };

///////// Private Function ///////////////

    function updateTotalReport() {
      $scope.itemPriceTotal = 0;
      $scope.couponWorthTotal = 0;

      for (var i = 0; i < $scope.coupons.length; i++) {
        $scope.itemPriceTotal += $scope.coupons[i].itemPriceTotal;
        $scope.couponWorthTotal += $scope.coupons[i].couponWorthTotal;
      }

    }

    function getTotalWithTax(price) {
      return price * taxPercentage;
    }

    function getNextId() {
      var currentId = 0;

      for (var i = 0; i < $scope.coupons.length; i++) {
        if ($scope.coupons[i].id > currentId ) {
          currentId = $scope.coupons[i].id;
        }
      }
      return currentId + 1;
    }

    function initModel() {

      // Clean the model variable
      $scope.id = '';
      $scope.itemName = '';
      $scope.itemQty = 0;
      $scope.itemPrice = 0;
      $scope.isTax = false;
      $scope.couponWorth = 0;
      $scope.couponQty = 0;
    }
  });