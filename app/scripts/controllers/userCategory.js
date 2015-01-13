'use strict';

var App = angular.module('BetsyApp');

App.factory('CategoriesData', function(){
    var categoriesData = [];

    return {
        getCategories: function () {
            return categoriesData;
        },
        setCategories: function (cat) {
            categoriesData = cat;
        },
        addCategory: function (cat) {
          categoriesData.push(cat);
        },
        removeCategory: function(id){

          // TODO : Refactor the Factory... not sure it's a best practice to have logic here.  Anyway, it should go with the PostgreSQL integration
          var loop = true;
          var i = 0;

          while (loop){
            
            if (categoriesData[i].id === id ) {
              categoriesData.splice(i, 1);
              loop = false;
            }
            i ++;
          }

        }
    };
});

App.controller('UserCategoryCtrl', function($scope, $http, localStorageService, CategoriesData) {
  
	$scope.$watch('userCategories', function () {

	  // Update the local storage
	  localStorageService.set('userCategories', $scope.userCategories);	   
	}, true);

	$scope.cleanCategoryModal = function() {
		$scope.categoryName = null;
	};

	$scope.removeCategory = function(id) {

		var loop = true;
		var i = 0;

		while (loop){
      
      if ($scope.userCategories[i].id === id ) {
        $scope.userCategories.splice(i, 1);
        loop = false;
      }
      i ++;
		}

    CategoriesData.removeCategory(id);
	};

	$scope.addCategory = function() {

	  var myCategory = {
	         id: 	 					$scope.getNextId(),
	         categoryName: 	$scope.categoryName,
	       };

         console.log('cat Name: ' + $scope.categoryName);

    // Array of user category that is saved to local storage.  Local Storage updated each time due to the "watch"
    $scope.userCategories.push(myCategory);  
    
    // Add the new category to the factory, to share it with the main controller
    CategoriesData.addCategory(myCategory);
    
    $scope.cleanCategoryModal();
	};

  $scope.getNextId = function() {
    var currentId = 0;

    for (var i = 0; i < $scope.userCategories.length; i++) {
      if ($scope.userCategories[i].id > currentId ) {
        currentId = $scope.userCategories[i].id;
      }
    }
    return currentId + 1;
  };

 
  $scope.readJson = function() {

    $http.get('data/categories.json')
      .then(function(res){
        var jsonCat = res.data;

        $scope.concatCategories(jsonCat);
      });
  };

  $scope.concatCategories = function(jsonCat) {
    // Happen the 2 list (default + user catgories) in the call back, since it's asynchronous
    var allCat = jsonCat.concat($scope.userCategories);

    CategoriesData.setCategories(allCat);
    console.log("concatCategories");
  };
  
  /////////////////////////////////////////  Private function ///////////////////////////////////////// 

  

  ///////////////////////////////////////// Initialization /////////////////////////////////////////

  var storedUserCategories = localStorageService.get('userCategories'); // Get local storage array "Betsy.userCategories"
 
  // Initialize the array of user categories if the local storage is empty
  $scope.userCategories = storedUserCategories || [];
  
  $scope.readJson();

	$scope.cleanCategoryModal();
});