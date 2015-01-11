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

  function addItem(tax, itemPrice, itemQty, couponQty, couponWorth, doubled){
      scope.id = '';
      scope.itemName = 'Test Item';
      scope.itemQty = itemPrice;
      scope.itemPrice = itemQty;
      scope.couponQty = couponQty;
      scope.couponWorth = couponWorth;
      scope.isTax = tax || false;
      scope.couponDouble = doubled || false;
      scope.saveItem();
}

  describe('Initial State', function () {

    it('Should be an empty Item data  when the app start', function () {
      expect(scope.id).toBe('');
      expect(scope.itemName).toBe('');
      expect(scope.itemQty).toBe('');
      expect(scope.itemPrice).toBe('');
      expect(scope.isTax).toBe(false);
      expect(scope.couponWorth).toBe('');
      expect(scope.couponDouble).toBe(false);
      expect(scope.couponQty).toBe('');
      expect(scope.itemNotes).toBe('');

      //dump('Should be an empty Item data  when the app start');
    });

    it('Should be an empty items[] when the app start', function() {
      expect(scope.items.length).toBe(0);

      //dump('Should be an empty items[] when the app start');
    });

    it('Should get report value equal to 0', function() {
      expect(scope.getTotalItemsPrice()).toBe(0);
      expect(scope.getTotalCouponsWorth()).toBe(0);

      //dump('Should be report value equal to 0');
    });
  });

  describe('Add/Edit/Remove Item Test Suite', function () {

    it('Should be 2 item in the array after saveItem() twice',function(){

      addItem();
      addItem();
      expect(scope.items.length).toBe(2);
    
      //dump('Should be 2 item in the array after saveItem() twice');
    });

    it('Should be 0 item in the array after removeItem()',function() {
      
      // Add a new item
      addItem(); 

      // Remove it
      scope.removeItem(0);
      expect(scope.items.length).toBe(0);
    
      //dump('Should be 0 item in the array after removeItem()');
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

      //dump('Should be a modified title after editing an item');
    });
  }); 

  describe('View Item Detail Test Suite', function () {
    
    it('Should be a right "Price per Item" in the Add/Edit item form',function() {

      // Should be 0 at the beginning
      expect(scope.getPricePerItem()).toBe(0);

      // 3 item @ 5$ = 5$ per item
      scope.itemQty = 3;
      scope.itemPrice = 5;
      expect(scope.getPricePerItem()).toBe(5);

      // 3 item @ 5$ - 2 coupon @ 1$ = 4.33$ per item
      scope.couponQty = 2;
      scope.couponWorth = 1;
      expect(scope.getPricePerItem()).toBe((13/3));

      // (3 item @ 5$ + tax) - 2 coupon @ 1$ = 4.33$ per item
      scope.isTax = true;
      var x = (((15 * scope.taxPercentage) - 2) / 3);
      expect(scope.getPricePerItem()).toBe(x);

      // (3 item @ 5$ + tax) - 2 coupon @ 1$ (doubled)
      scope.couponDouble = true;
      var x = (((15 * scope.taxPercentage) - 2 * 2) / 3);
      expect(scope.getPricePerItem()).toBe(x);

      //dump('Should be a right "Price per Item" in the Add/Edit item form');
    });

    it('Should be a right "Total Price" in the Add/Edit item form',function() {

      // Should be 0 without data
      expect(scope.getTotalPrice()).toBe(0);

      // 2 items @ 5$ = 10$
      scope.itemQty = 2;
      scope.itemPrice = 5;
      expect(scope.getTotalPrice()).toBe(10);

      // 2 items @ 5$ + tax = 10$
      scope.isTax = true;
      expect(scope.getTotalPrice()).toBe(10 * scope.taxPercentage);

      // 2 items @ 5$ - 2 coupon @ 1 = 8
      scope.isTax = false;
      scope.couponQty = 2;
      scope.couponWorth = 1;
      expect(scope.getTotalPrice()).toBe(8);

      // 2 items @ 5$ - 2 coupon @ 1.5 (doubled) = 4
      scope.couponDouble = true;
      scope.couponWorth = 1.5;
      expect(scope.getTotalPrice()).toBe(4);

      //dump('Should be a right "Total Price" in the Add/Edit item form');
    });

    it('Should be a right tax amount when tax is applicable',function() {    
      expect(scope.addTax(10,false) ).toBe(10);
      expect(scope.addTax(10,true) ).toBe(10 * scope.taxPercentage);

      //dump('Should be a right tax amount when tax is applicable');
    });

    it('Should be a right double coupon amount when application', function() {
      expect(scope.doubleCouponWorth(0,true) ).toBe(0);
      expect(scope.doubleCouponWorth(0,false) ).toBe(0);
      expect(scope.doubleCouponWorth(1.5,true) ).toBe(3.0);
      expect(scope.doubleCouponWorth(1.5,false) ).toBe(1.5);
    })
  });

  describe('Report Test Suite', function () {
    it('Should be a right "Total Amount with Tax" in the report',function() {

      // Be sure it equal 0 if empty
      expect(scope.getTotalItemsPrice()).toBe(0);

      addItem(false,2,5);
      addItem(false,3,10);
      expect(scope.getTotalItemsPrice()).toBe(40);

      //dump('Should be a right "Total Amount with Tax" in the report');
    });

    it('Should be a right "Total Coupon" in the report',function() {
      
      // Be sure it equal 0 if empty
      expect(scope.getTotalCouponsWorth()).toBe(0);

      addItem(false,2,5,2,1);
      addItem(false,3,10,2,1, true);
      expect(scope.getTotalCouponsWorth()).toBe(6);      
      //dump('Should be a right "Total Coupon" in the report');
    });

    it('Should be a right "Amount to pay with Tax" in the report',function() {
      
      // Be sure it equal 0 if empty
      expect(scope.getTotalAmountToPay()).toBe(0);

      addItem(false,2,5);
      addItem(false,3,10);
      expect(scope.getTotalAmountToPay()).toBe(40);
    
      //dump('Should be a right "Amount to pay with Tax" in the report');
    });
  });

});
