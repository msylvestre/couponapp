'use strict';

angular.module('BetsyApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var taxPercentage = 1.155;
    var itemsInStore = localStorageService.get('items'); // Get local storage array "Betsy.items"
    var editIndex = 0;

    // Array of item
    $scope.items = itemsInStore || [];

    initItemModel();

    // FUNC: Watch when change happen in the "items" array and update the localstorage
    $scope.$watch('items', function () {

      // Update the local storage
      localStorageService.set('items', $scope.items);

      updateTotalReport();
    }, true);

    $scope.cleanForm = function() {
      initItemModel();
    }

    // FUNC: Add a item to the "items" array by creating a jason object.  Later will insert into a db
    $scope.saveItem = function () {

      var itemPriceTotal = $scope.itemQty * $scope.itemPrice;

      if ($scope.isTax) {
        itemPriceTotal = getTotalWithTax(itemPriceTotal);
      }

      console.log('$scope.id: ' + $scope.id);

      // Add new item  if there's no id set.  And handle the first item where the id isn't defined yet
      if ($scope.id === undefined || $scope.id === '') {
        
        alert("add new");
        var myItem = {
          id: getNextId(),
          itemName:             $scope.itemName,
          itemQty:              $scope.itemQty || 0,
          itemPrice:            $scope.itemPrice || 0,
          isTax:                $scope.isTax,
          itemPriceTotal:       itemPriceTotal || 0,
          couponWorth:          $scope.couponWorth || 0,
          couponQty:            $scope.couponQty || 0,
          couponWorthTotal:     ($scope.couponWorth * $scope.couponQty) || 0,
          itemTotalPriceSaving: (itemPriceTotal - ($scope.couponWorth * $scope.couponQty)) || 0,
          itemDesc:             $scope.itemDesc,          
        };

        //alert("myitem.desc: " + myItem.desc);
        $scope.items.push(myItem);
        initItemModel();
      }
      else {  // Edit item
        console.log('$index and save edit: ' + editIndex);

          $scope.items[editIndex].itemName              = $scope.itemName;
          $scope.items[editIndex].itemQty               = $scope.itemQty;
          $scope.items[editIndex].itemPrice             = $scope.itemPrice;
          $scope.items[editIndex].isTax                 = $scope.isTax;
          $scope.items[editIndex].itemPriceTotal        = itemPriceTotal;
          $scope.items[editIndex].couponWorth           = $scope.couponWorth;
          $scope.items[editIndex].couponQty             = $scope.couponQty;
          $scope.items[editIndex].couponWorthTotal      = $scope.couponWorth * $scope.couponQty;
          $scope.items[editIndex].itemTotalPriceSaving  = itemPriceTotal - ($scope.couponWorth * $scope.couponQty);
          $scope.items[editIndex].itemDesc              = $scope.itemDesc;
      }

      initItemModel();

    };

    // FUNC: Remove a item from the "items" array.  Later will remove from the db
    $scope.removeItem = function (index) {
      $scope.items.splice(index, 1);
    };

    // FUNC: Load the detail in the view scope
    $scope.detailItem = function (index) {

      editIndex           = index;
      $scope.id           = $scope.items[index].id;
      $scope.itemName     = $scope.items[index].itemName;
      $scope.itemQty      = $scope.items[index].itemQty;
      $scope.itemPrice    = $scope.items[index].itemPrice;
      $scope.isTax        = $scope.items[index].isTax;
      $scope.couponWorth  = $scope.items[index].couponWorth;
      $scope.couponQty    = $scope.items[index].couponQty;
      $scope.itemDesc     = $scope.items[index].itemDesc;
    };

///////// Private Function ///////////////

    function updateTotalReport() {
      $scope.itemPriceTotal = 0;
      $scope.couponWorthTotal = 0;

      for (var i = 0; i < $scope.items.length; i++) {
        $scope.itemPriceTotal += $scope.items[i].itemPriceTotal;
        $scope.couponWorthTotal += $scope.items[i].couponWorthTotal;
      }
    };

    function getTotalWithTax(price) {
      return price * taxPercentage;
    };

    function getNextId() {
      var currentId = 0;

      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].id > currentId ) {
          currentId = $scope.items[i].id;
        }
      }
      return currentId + 1;
    };

    function initItemModel() {

      // Clean the model variable
      $scope.id           = '';
      $scope.itemName     = '';
      $scope.itemQty      = '';
      $scope.itemPrice    = '';
      $scope.isTax        = false;
      $scope.couponWorth  = '';
      $scope.couponQty    = '';
      $scope.itemDesc     = '';
    };

  });