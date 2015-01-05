var App = angular.module('BetsyApp');

App.controller('ListCtrl', function($scope, $http, localStorageService) {
  
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
        
      	console.log("rem id: "   + $scope.userCategories[i].id);
      	console.log("rem catName: "   + $scope.userCategories[i].categoryName);
        $scope.userCategories.splice(i, 1);
        loop = false;
      }
      i ++;
		}
		
	};

	$scope.addCategory = function() {

	  var myCategory = {
	         id: 	 					$scope.getNextId(),
	         categoryName: 	$scope.categoryName,
	       };

      	console.log("add id: "   + myCategory.id);
      	console.log("add catName: "   + myCategory.categoryName);

    //alert("myitem.desc: " + myItem.desc);
    $scope.userCategories.push(myCategory);

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
  }

/////////////////////////////////////////  Private function ///////////////////////////////////////// 



///////////////////////////////////////// Initialization /////////////////////////////////////////

  var storedUserCategories = localStorageService.get('userCategories'); // Get local storage array "Betsy.userCategories"

  // Initialize the array of user categories if the local storage is empty
  $scope.userCategories = storedUserCategories || [];

// TODO : Append the 2 list - Categories + User Categorie.  Need to find how to add 2 array
 $http.get('data/categories.json')
       .then(function(res){
          console.log("$scope.userCategories"); 
          console.log($scope.userCategories); 
					console.log("res.data"); 
          console.log(res.data);
          $scope.categories = res.data;
        });

  //$scope.categories.concat($scope.userCategories);
	$scope.cleanCategoryModal();

});