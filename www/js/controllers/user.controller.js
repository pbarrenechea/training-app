(function() {
  'use strict';

  /** @ngInject */
  function UsersController( $log, UserService, $ionicFilterBar, $location) {
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
    reloadUsers();

    function reloadUsers(){
      return UserService.GetAll().then(function(results){
        vm.userList = results;
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
        expression: function (filterText, value) {
          return value.firstName.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
            || value.lastName.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
            || (value.firstName + " " + value.lastName).toLowerCase().indexOf(filterText.toLowerCase()) !== -1; },
        update: function (filteredItems, filterText) {
          vm.userList = filteredItems;
        }
      });
    }

  };


  UsersController.$inject = ["$log", "UserService","$ionicFilterBar", "$location"];
  angular.module('Training').controller('UsersController',UsersController);
})();
