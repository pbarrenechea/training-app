(function() {
  'use strict';

  /** @ngInject */
  function EditUserController($log, UserService, $stateParams, $location) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.user = {};
    /**
     * Methods
     */
    vm.save = save;

    init();

    function init(){
      vm.user.action = $stateParams.action;
      vm.user.id = $stateParams.id;
      if( vm.user.id !== "" ){
        UserService.GetById(vm.user.id).then(function(user){
          for(var k in user){
            vm.user[k] = user[k];
          }
        });
      }
    }

    function updateCallback(){
      vm.logger.log("User created succesfully");
      vm.user = {};
      $location.path("/users");
    }

    function createUser(){
      UserService.Create(vm.user).then(updateCallback);
    }

    function updateUser(){
      UserService.Update(vm.user).then(updateCallback)
    }

    function save(){
      if( vm.user.action === "save" ){
        createUser();
      }else{
        updateUser();
      }

    }
  };


  EditUserController.$inject = ["$log", "UserService","$stateParams", "$location"];
  angular.module('Training').controller('EditUserController',EditUserController);
})();
