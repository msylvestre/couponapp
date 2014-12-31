'use strict';
describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('BetsyApp'));

  var MainCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      '$scope': scope
    });
  }));

  function addItem(tax, itemPrice, itemQty){
      scope.id = '';
      scope.itemName = 'Test Item';
      scope.itemQty = itemPrice;
      scope.itemPrice = itemQty;
      scope.isTax = tax || false;
      scope.saveItem();
  }

  describe('Initial State', function () {

    it('Should be an empty Item data  when the app start', function () {
      expect(scope.id).toBe("");
      expect(scope.itemName).toBe("");
      expect(scope.itemQty).toBe("");
      expect(scope.itemPrice).toBe("");
      expect(scope.isTax).toBe(false);
      expect(scope.couponWorth).toBe("");
      expect(scope.couponQty).toBe("");
      expect(scope.itemNotes).toBe("");

      dump('Should be an empty Item data  when the app start : SUCCESS');
    });

    it('Should be an empty items[] when the app start', function() {
      expect(scope.items.length).toBe(0);

      dump('Should be an empty items[] when the app start : SUCCESS');
    });

    it('Should get report value equal to 0', function() {
      expect(scope.itemsPriceTotal).toBe(0);
      expect(scope.couponsWorthTotal).toBe(0);

      dump('Should be report value equal to 0 : SUCCESS');
    });
  });

  describe('Add/Edit/Remove Item Test Suite', function () {

    it('Should be 2 item in the array after saveItem() twice',function(){

      addItem();
      addItem();
      expect(scope.items.length).toBe(2);
    
      dump('Should be 2 item in the array after saveItem() twice : SUCCESS');
    });

    it('Should be 0 item in the array after removeItem()',function() {
      
      // Add a new item
      addItem(); 

      // Remove it
      scope.removeItem(0);
      expect(scope.items.length).toBe(0);
    
      dump('Should be 0 item in the array after removeItem() : SUCCESS');
    });

    it('Should be a modified title after editing an item',function() {

      // Add a new item
      addItem();
      expect(scope.items[0].itemName).toBe('Test Item');

      // Edit the item
      scope.getDetailItem(0);
      scope.itemName = 'Modified Item';
      scope.saveItem();
      expect(scope.items[0].itemName).toBe('Modified Item');      

      dump('Should be a modified title after editing an item');
    });
  }); 

  describe('View Item Detail Test Suite', function () {
    
    it('Should be a right amount of tax if item is taxable',function() {
      
      // No Tax
      addItem(false, 2, 5);
      expect(scope.items[0].itemPriceTotal).toBe(10);

      // With tax
      addItem(true, 2, 5);
      expect(scope.items[1].itemPriceTotal).toBe(10 * scope.taxPercentage);

      dump('Should be a right amount of tax if item is taxable');
    });

    it('Should be a right "Price per Item" in the Add/Edit item form',function() {

      // 3 item @ 5$ = 5$ per item
      
      // 3 item @ 5$ - 2 coupon @ 1$ = 4.33$ per item

      dump('');
    });

    it('Should be a right "Total Price" in the Add/Edit item form',function() {

      dump('');
    });
  });

  describe('Report Test Suite', function () {
    it('Should be a right "Total Amount with Tax" in the report',function() {

      dump('');
    });

    it('Should be a right "Total Coupon" in the report',function() {
      
      dump('');
    });

    it('Should be a right "Amount to pay with Tax" in the report',function() {
    
      dump('');
    });
  });

});