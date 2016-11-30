(function() {
  'use strict';

  /** @ngInject */
  function AddUserController($log, UserService, $ionicFilterBar, $location) {
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

    function save(){
      UserService.Create(vm.user).then(function(response){
        vm.logger.log("User created succesfully");
        vm.user = {};
        $location.path("/addUser");
      });
    }
  };


  AddUserController.$inject = ["$log", "UserService","$ionicFilterBar", "$location"];
  angular.module('Training').controller('AddUserController',AddUserController);
})();
