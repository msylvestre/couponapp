'use strict';

/**
 * @ngdoc function
 * @name yeoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeoApp
 */
angular.module('yeoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
