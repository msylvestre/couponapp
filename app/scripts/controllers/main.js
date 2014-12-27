'use strict';

angular.module('yeoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
     /*
      $scope.todos = [
        {
          name: 'Coupon 1',
          price: 0.99,
          description: 'Revelon rebate next week',
          canPurchase: true,
          soldOut: false,
        }
      ];
      */
      localStorageService.set('todos', $scope.todos);
      $scope.getTotal();
    }, true);

    $scope.addCoupon = function () {
      
      
      var myCoupon = {
        itemName: $scope.itemName,
        itemQty: $scope.itemQty,
        itemPrice: $scope.itemPrice,
        isTax: $scope.isTax,
        couponWorth: $scope.couponWorth,
        couponQty: $scope.couponQty,
      };
      
      //window.alert("mycoupon.desc: " + myCoupon.desc);
      $scope.todos.push(myCoupon);
      $scope.desc = '';
      $scope.price = '';
      //$scope.getTotal();
    };

    $scope.removeCoupon = function (index) {
      $scope.todos.splice(index, 1);
    };

    $scope.getTotal = function () {
      $scope.itemPriceTotal = 0;
      $scope.couponWorthTotal = 0;

      for (var i = 0; i < $scope.todos.length; i++) {
        $scope.itemPriceTotal = $scope.itemPriceTotal + $scope.todos[i].itemPrice;
        $scope.couponWorthTotal = $scope.couponWorthTotal + $scope.todos[i].couponWorth;
      }

      //$scope.total = 99.9;
    };

  });