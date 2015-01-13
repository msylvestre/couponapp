'use strict'; 

var App = angular.module('BetsyApp');

App.factory('ItemsData', function(){
    var itemsData = [];
    var editIndex = 0;

    return {
        getItems: function () {
            return itemsData;
        },
        
        setItems: function (items) {
            itemsData = items;
        },

        removeItem: function(id){

          // TODO : Refactor the Factory... not sure it's a best practice to have logic here.  
          //        Anyway, it should go with the PostgreSQL integration
          var loop = true;
          var i = 0;

          while (loop){
            
            if (itemsData[i].id === id ) {
              itemsData.splice(i, 1);
              loop = false;
            }
            i ++;
          }
        },

        setDetailItem: function(index){
          console.log('ItemsData.setDetailItem index: ' + index);
          editIndex = index;
        },

        getDetailItem: function(){
          console.log('returning index after detecting an action: ' + editIndex);
          return editIndex;
        },

        getTotalItemsPrice: function() {

        },
        getTotalCouponsWorth: function() {

        },
        getTotalAmountToPay: function() {

        }
    };
});

App.controller('ItemCtrl', function($scope, localStorageService, ItemsData) {

  // FUNC: Watch when change happen in the "items" array and update the localstorage
  $scope.$watch('items', function () {

    // Update the local storage
    localStorageService.set('items', $scope.items);
    ItemsData.setItems($scope.items);
  }, true);

  $scope.$watch(function () 
    { return ItemsData.getDetailItem(); }, function (newValue) {
      
      //if (newValue) {
        console.log('newValue: ' + newValue);
        $scope.getDetailItem(newValue);
      //}        
  });  



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
    
    $scope.id           = $scope.items[index].id;
    $scope.itemName     = $scope.items[index].itemName;
    $scope.itemQty      = $scope.items[index].itemQty;
    $scope.itemPrice    = $scope.items[index].itemPrice;
    $scope.isTax        = $scope.items[index].isTax;
    $scope.couponWorth  = $scope.items[index].couponWorth; // Flush that calculated field !!!
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

  ///////////////////////////////////////// Initialization /////////////////////////////////////////

    $scope.taxPercentage = 1.14975;
    var editIndex = 0;

    // Array of item
    $scope.items = localStorageService.get('items') || [];
    ItemsData.setItems($scope.items);

    console.log("---------------item.js/scope.items-------------");
    console.log($scope.items);
    console.log("---------------eof item.js/scope.items-------------");

    $scope.cleanForm();

});