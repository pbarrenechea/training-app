(function() {
  'use strict';

  /** @ngInject */
  function EditTestController($log, TestService, UserService, $stateParams, $location) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.test = {};
    vm.user = {};
    /**
     * Methods
     */
    vm.save = save;

    init();

    function init(){
      vm.test.action = $stateParams.action;
      vm.test.id = $stateParams.id;
      vm.test.user_id = $stateParams.userId;
      UserService.GetById(vm.test.user_id).then(function(user){
        vm.user = user;
      });
      if( vm.test.id !== "" ){
        TestService.GetById(vm.test.id).then(function(test){
          for(var k in test){
            vm.test[k] = test[k];
          }
          vm.test.dotTmp = new Date(Number(vm.test.dot));
        });
      }else {
        vm.test.dotTmp = new Date();
      }
    }

    function updateCallback(){
      vm.logger.log("User created succesfully");
      var userId = vm.test.user_id;
      vm.test = {};
      $location.path("/tab/userTests/" + userId);
    }

    function save(form){
      if( form.$valid ){
        vm.test.dot = vm.test.dotTmp.getTime();
        if( vm.test.action === "new" ){
          TestService.Create(vm.test).then(updateCallback);
        }else{
          TestService.Update(vm.test).then(updateCallback)
        }
      }
    }
  };


  EditTestController.$inject = ["$log", "TestService", "UserService","$stateParams", "$location"];
  angular.module('Training').controller('EditTestController',EditTestController);
})();
