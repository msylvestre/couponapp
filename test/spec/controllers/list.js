'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('BetsyApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('ListCtrl', {
      $scope: scope
    });
  }));

  describe('Validate initial state', function () {

    it('should an empty category list to begin with', function () {
      expect(scope.userCategories.length).toBe(0);
    });

    it('should be an empty field for user category', function () {
      expect(scope.categoryName).toBe(null);
    });

  });

  describe('Add / Remove a Category', function () {

    it('should be to category in the local storage when adding 2 item', function () {
      
      scope.categoryName = "Test category";
      scope.addCategory();
      scope.categoryName = "Test category 2";
      scope.addCategory();

      expect(scope.userCategories.length).toBe(2);
    });

    it('should an item with name "test category" after adding a category', function () {
 
      scope.categoryName = "Test category";
      scope.addCategory();
      expect(scope.userCategories[0].categoryName).toBe("Test category");
    });

    it('should be 1 item in the array after removing a category', function () {

      scope.categoryName = "Test category 1";
      scope.addCategory();
      scope.categoryName = "Test category 2";
      scope.addCategory();
      scope.categoryName = "Test category 3";
      scope.addCategory();
      expect(scope.userCategories.length).toBe(3);
 
      scope.removeCategory(2);
      expect(scope.userCategories.length).toBe(2);
      expect(scope.userCategories[0].categoryName).toBe("Test category 1");
    });

    it('should be id 0 then 1 when callin getNextId()', function () {

      expect(scope.getNextId()).toBe(1);

      scope.categoryName = "Test category 1";
      scope.addCategory();

      expect(scope.getNextId()).toBe(2);
      
    });

  });
});
