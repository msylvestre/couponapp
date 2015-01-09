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

    //alert("myitem.desc: " + myItem.desc);
    $scope.userCategories.push(myCategory);  // Array of user category that is saved to local storage
    

    // The form category list is not updated on the UI after adding a new category.
    // See example here : https://docs.angularjs.org/api/ng/directive/select
    $scope.categories.push(myCategory);  // Push the new category to the current list use in the UI


    console.log('$scope.categories');
    console.log($scope.categories);
    
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

/////////////////////////////////////////  Private function ///////////////////////////////////////// 

$scope.readJson = function() {

  $http.get('data/categories.json')
    .then(function(res){
      var x = res.data;

      // Happen the 2 list (default + user catgories) in the call back, since it's asynchronous
      $scope.categories = x.concat($scope.userCategories);

      //console.log("cat len: " + $scope.categories.length);
    });
};

///////////////////////////////////////// Initialization /////////////////////////////////////////

  var storedUserCategories = localStorageService.get('userCategories'); // Get local storage array "Betsy.userCategories"
  var x = [];

  // Initialize the array of user categories if the local storage is empty
  $scope.userCategories = storedUserCategories || [];
  
  $scope.readJson();

	$scope.cleanCategoryModal();

});