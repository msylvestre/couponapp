'use strict';

var App = angular.module('BetsyApp');

App.factory('ItemsData', function(){
    var itemsData = [];

    return {
        getItems: function () {
            return itemsData;
        },
        setItems: function (items) {
            itemsData = items;
        },
        addItem: function (items) {
          itemsData.push(items);
        },
        removeItem: function(id){

          // TODO : Refactor the Factory... not sure it's a best practice to have logic here.  Anyway, it should go with the PostgreSQL integration
          var loop = true;
          var i = 0;

          while (loop){
            
            if (itemsData[i].id === id ) {
              itemsData.splice(i, 1);
              loop = false;
            }
            i ++;
          }

        }
    };
});

App.controller('itemCtrl', function($scope, localStorageService, ItemsData) {
  

  /////////////////////////////////////////  Private function ///////////////////////////////////////// 


  ///////////////////////////////////////// Initialization /////////////////////////////////////////


});