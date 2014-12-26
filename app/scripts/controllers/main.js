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
      
      var myCoupon = {desc: $scope.desc, price: $scope.price};
      
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
      $scope.total = 0;

      for (var i = 0; i < $scope.todos.length; i++) {
        $scope.total = $scope.total + $scope.todos[i].price;
      }

      //$scope.total = 99.9;
    };

  });