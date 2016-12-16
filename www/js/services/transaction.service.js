/**
 * @ngdoc service
 * @name Training.TransactionService
 * @requires $log
 * @requires DB
 * @description
 * Stores all the transactions that the front end does, to sync with backend
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('TransactionsService', TransactionsService);
  TransactionsService.$inject = ['DB', '$log'];

  function TransactionsService( DB, $log) {
    var service = {};

    service.getBackendData = function(){
    };

    service.processTransactions = function(){

    };

    service.sendDataToBackend = function(){

    };

    service.addTransaction = function(operation, table, oldData, newData){

    };

  };
});
