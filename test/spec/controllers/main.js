'use strict';
describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('BetsyApp'));

  var MainCtrl;
  var scopeMain;
  var ItemCtrl;
  var scopeItem;

  // Initialize the controller and a mock scopeMain
  beforeEach(inject(function ($controller, $rootScope) {
    scopeMain = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      '$scope': scopeMain
    });

    scopeItem = $rootScope.$new();
    ItemCtrl = $controller('ItemCtrl', {
      '$scope': scopeItem
    });

  }));

  function addItem(tax, itemPrice, itemQty, couponQty, couponWorth, doubled){
      scopeItem.id = '';
      scopeItem.itemName = 'Test Item';
      scopeItem.itemQty = itemPrice;
      scopeItem.itemPrice = itemQty;
      scopeItem.couponQty = couponQty;
      scopeItem.couponWorth = couponWorth;
      scopeItem.isTax = tax || false;
      scopeItem.couponDouble = doubled || false;
      scopeItem.saveItem();
}

  describe('Initial State', function () {

    it('Should get report value equal to 0', function() {
      expect(scopeItem.getTotalItemsPrice()).toBe(0);
      expect(scopeItem.getTotalCouponsWorth()).toBe(0);
      expect(scopeItem.getTotalAmountToPay()).toBe(0);

      //dump('Should be report value equal to 0');
    });
  });

  describe('Report Test Suite', function () {
    it('Should be a right "Total Amount with Tax" in the report',function() {

      // Be sure it equal 0 if empty
      expect(scopeItem.getTotalItemsPrice()).toBe(0);

      addItem(false,2,5);
      addItem(false,3,10);
      expect(scopeItem.getTotalItemsPrice()).toBe(40);

      //dump('Should be a right "Total Amount with Tax" in the report');
    });

    it('Should be a right "Total Coupon" in the report',function() {
      
      // Be sure it equal 0 if empty
      expect(scopeItem.getTotalCouponsWorth()).toBe(0);

      addItem(false,2,5,2,1);
      addItem(false,3,10,2,1, true);
      expect(scopeItem.getTotalCouponsWorth()).toBe(6);      
      //dump('Should be a right "Total Coupon" in the report');
    });

    it('Should be a right "Amount to pay with Tax" in the report',function() {
      
      // Be sure it equal 0 if empty
      expect(scopeItem.getTotalAmountToPay()).toBe(0);

      addItem(false,2,5);
      addItem(false,3,10);
      expect(scopeItem.getTotalAmountToPay()).toBe(40);
    
      //dump('Should be a right "Amount to pay with Tax" in the report');
    });
  });

});
