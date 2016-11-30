(function() {
  'use strict';

  /** @ngInject */
  function UsersController($state, $scope, $log, UserService, $ionicFilterBar, $location) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.user = {};
    vm.userList = [];

    /**
     * Methods
     */
    vm.showFilterBar = showFilterBar;
    vm.filterBar;
    vm.deleteUser = deleteUser;
    vm.save = save;

    reloadUsers();

    function reloadUsers(){
      return UserService.GetAll().then(function(results){
        vm.userList = results;
      });
    }

    function save(){
      vm.user.username = vm.user.firstName + " " + vm.user.lastName;
      UserService.Create(vm.user).then(function(response){
        vm.logger.log("User created succesfully");
        var newObject = JSON.parse(JSON.stringify(vm.user));
        vm.userList.push(newObject);
        vm.user = {};
        $state.go("tab.users");
      });
    }


    function deleteUser(userId){
      vm.logger.log("Deleting user");
      UserService.Delete(userId).then(function(response){
        reloadUsers();
      });
    }

    function showFilterBar(){
      vm.logger.log("Triggering filter bar");
      vm.filterBar = $ionicFilterBar.show({
        items: vm.userList,
        update: function (filteredItems) {
          /**
           * @TODO: filter items, maybe create a directive
           */
        }
      });
    }

  };


  UsersController.$inject = ['$state', '$scope', "$log", "UserService","$ionicFilterBar", "$location"];
  angular.module('Training').controller('UsersController',UsersController);
})();
