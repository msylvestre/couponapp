var App = angular.module('BetsyApp');

App.controller('ListCtrl', function($scope, $http) {
  
  $http.get('data/categories.json')
       .then(function(res){
          $scope.categories = res.data;                
        });

       $scope.selectedCategory = null;
});