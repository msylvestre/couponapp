'use strict';

angular.module('yeoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var couponsInStore = localStorageService.get('coupons');

    $scope.coupons = couponsInStore || [];

    // FUNC: Watch when change happen in the "coupons" array and update the localstorage
    $scope.$watch('coupons', function () {

      // Update the local storage
      localStorageService.set('coupons', $scope.coupons);

      $scope.updateTotal();
    }, true);

    // FUNC: Add a coupon to the "coupons" array by creating a jason object.  Later will insert into a db
    $scope.addCoupon = function () {
      
      
      var myCoupon = {
        itemName: $scope.itemName,
        itemQty: $scope.itemQty,
        itemPrice: $scope.itemPrice,
        isTax: $scope.isTax,
        couponWorth: $scope.couponWorth,
        couponQty: $scope.couponQty,
      };
      
      //alert("mycoupon.desc: " + myCoupon.desc);
      $scope.coupons.push(myCoupon);
      $scope.desc = '';
      $scope.price = '';
    };

    // FUNC: Remove a coupon from the "coupons" array.  Later will remove from the db
    $scope.removeCoupon = function (index) {
      $scope.coupons.splice(index, 1);
    };

    $scope.updateTotal = function () {
      $scope.itemPriceTotal = 0;
      $scope.couponWorthTotal = 0;

      for (var i = 0; i < $scope.coupons.length; i++) {
        $scope.itemPriceTotal = $scope.itemPriceTotal + $scope.coupons[i].itemPrice;
        $scope.couponWorthTotal = $scope.couponWorthTotal + $scope.coupons[i].couponWorth;
      }

    };

    // Example of alert
    $scope.hello = function(name) {
        return name + " inc.";

        //HTML : <pre>{{hello("marco")}}</pre>
    }

  });