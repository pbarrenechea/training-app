(function() {
  'use strict';

  /** @ngInject */
  function UserTestsController($stateParams, TestService, UserService) {
    var vm = this;
    vm.user = {};
    vm.tests = [];
    init();

    function init(){
      var userId = $stateParams.userId;
      UserService.GetById(userId).then(function(user){
        vm.user = user;
      });
      TestService.GetByUserId(userId).then(function(testList){
        vm.tests = testList;
      });
    }
  }

  UserTestsController.$inject = ["$stateParams" ,"TestService","UserService"];
  angular.module('Training').controller('UserTestsController', UserTestsController);
})();
