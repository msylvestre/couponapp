'use strict';
 
angular.module('BetsyApp') 

  .controller('MainCtrl', function ($scope, $http, localStorageService, CategoriesData) {

    $scope.$watch(function () 
      { return CategoriesData.getCategories(); }, function (newValue) {
        if (newValue) {
          $scope.categories = newValue;
        }        
    });  
 
    // FUNC: Watch when change happen in the "items" array and update the localstorage
    $scope.$watch('items', function () {

      // Update the local storage
      localStorageService.set('items', $scope.items);

      updateReportData(); 
    }, true);

    $scope.cleanForm = function() {
      // Clean the model variable
      $scope.id           = '';
      $scope.itemName     = '';
      $scope.itemQty      = '';
      $scope.itemPrice    = '';
      $scope.selectedCategory = '';
      $scope.isTax        = false;
      $scope.couponWorth  = '';
      $scope.couponDouble = false;
      $scope.couponQty    = '';
      $scope.itemNotes    = '';
    };

    // FUNC: Add a item to the "items" array by creating a jason object.  Later will insert into a db
    $scope.saveItem = function () {

      // Add new item  if there's no id set.  And handle the first item where the id isn't defined yet
      if ($scope.id === undefined || $scope.id === '') {

        var myItem = {
          id: getNextId(),
          itemName:             $scope.itemName,
          itemQty:              $scope.itemQty || 0,
          itemPrice:            $scope.itemPrice || 0,
          isTax:                $scope.isTax,
          couponWorth:          $scope.couponWorth || 0,
          couponDouble:         $scope.couponDouble,
          couponQty:            $scope.couponQty || 0,
          couponWorthTotal:     ($scope.couponWorth * $scope.couponQty) || 0,
          itemNotes:            $scope.itemNotes,          
        };

        //alert("myitem.desc: " + myItem.desc);
        $scope.items.push(myItem);
      }
      else {  // Edit item

          $scope.items[editIndex].itemName              = $scope.itemName;
          $scope.items[editIndex].itemQty               = $scope.itemQty;
          $scope.items[editIndex].itemPrice             = $scope.itemPrice;
          $scope.items[editIndex].isTax                 = $scope.isTax;
          $scope.items[editIndex].couponWorth           = $scope.couponWorth;
          $scope.items[editIndex].couponDouble          = $scope.couponDouble;
          $scope.items[editIndex].couponQty             = $scope.couponQty;
          $scope.items[editIndex].couponWorthTotal      = $scope.couponWorth * $scope.couponQty;
          $scope.items[editIndex].itemNotes             = $scope.itemNotes;
      }

      $scope.cleanForm();
    };

    // FUNC: Remove a item from the "items" array.  Later will remove from the db
    $scope.removeItem = function (index) {
      $scope.items.splice(index, 1);
    };

    // FUNC: Load the detail in the view scope
    $scope.getDetailItem = function (index) {
      editIndex           = index;
      $scope.id           = $scope.items[index].id;
      $scope.itemName     = $scope.items[index].itemName;
      $scope.itemQty      = $scope.items[index].itemQty;
      $scope.itemPrice    = $scope.items[index].itemPrice;
      $scope.isTax        = $scope.items[index].isTax;
      $scope.couponWorth  = $scope.items[index].couponWorth;
      $scope.couponDouble = $scope.items[index].couponDouble;
      $scope.couponQty    = $scope.items[index].couponQty;
      $scope.itemNotes    = $scope.items[index].itemNotes;
    };

    $scope.addTax = function(itemPrice, isTax) {
      if (isTax) {
        return itemPrice * $scope.taxPercentage;
      }

      return itemPrice;
    };

    $scope.doubleCouponWorth = function(couponWorth, isDoubled) {
      if (isDoubled) {
        return couponWorth * 2.0;
      }

      return couponWorth;
    }

    $scope.getTotalPrice = function() {
      var x = (($scope.itemQty * $scope.addTax($scope.itemPrice, $scope.isTax)) - 
               ($scope.couponQty * $scope.doubleCouponWorth($scope.couponWorth, $scope.couponDouble)));

      return x || 0;
    };

    $scope.getPricePerItem = function() {
      var x = (($scope.itemQty * $scope.addTax($scope.itemPrice, $scope.isTax)) - 
               ($scope.couponQty * $scope.doubleCouponWorth($scope.couponWorth, $scope.couponDouble))) / $scope.itemQty; 

      return x || 0;
    };

    $scope.getTotalItemsPrice = function() {
      var itemsPriceTotal = 0;

      for (var i = 0; i < $scope.items.length; i++) {
        itemsPriceTotal += $scope.addTax($scope.items[i].itemQty * $scope.items[i].itemPrice, $scope.items[i].isTax);
      }

      return itemsPriceTotal || 0;
    };

    $scope.getTotalCouponsWorth = function() {
      var couponsWorthTotal = 0;

      for (var i = 0; i < $scope.items.length; i++) {
        couponsWorthTotal += $scope.doubleCouponWorth($scope.items[i].couponWorthTotal, $scope.items[i].couponDouble);
      }

      $scope.amountToPay = $scope.itemsPriceTotal - $scope.couponsWorthTotal;
    
      return couponsWorthTotal || 0;
    };

    $scope.getTotalAmountToPay = function() {
      return $scope.getTotalItemsPrice() - $scope.getTotalCouponsWorth() || 0;
    };

    $scope.debugButton = function() {
      console.log('selectedCategory : ' + $scope.selectedCategory);
    };

    /////////////////////////////////////////  Private function /////////////////////////////////////////

    function getNextId() {
      var currentId = 0;

      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].id > currentId ) {
          currentId = $scope.items[i].id;
        }
      }
      return currentId + 1;
    }

    function updateReportData() {
      $scope.getTotalItemsPrice();
      $scope.getTotalCouponsWorth();
      $scope.getTotalAmountToPay();
    }

    /////////////////////////////////////////  Private function ///////////////////////////////////////// 


    /////////////////////////////////////////  Initialize /////////////////////////////////////////

    $scope.taxPercentage = 1.14975;
    var itemsInStore = localStorageService.get('items'); // Get local storage array "Betsy.items"
    var editIndex = 0;

    // Array of item
    $scope.items = itemsInStore || [];

    $scope.cleanForm();
    $scope.getTotalItemsPrice();
  });