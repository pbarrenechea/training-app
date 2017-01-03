(function () {
  'use strict';

  /** @ngInject */
  function UserTestsController($log, $stateParams, TestService, UserService, $ionicPopup) {
    var vm = this;
    vm.user = {};
    vm.tests = [];
    vm.confirmDelete = confirmDelete;
    init();

    function init() {
      var userId = $stateParams.userId;
      UserService.GetById(userId).then(function (user) {
        vm.user = user;
      });
      TestService.GetByUserId(userId).then(function (testList) {
        vm.tests = testList;
      });
    }

    function reloadTests() {
      TestService.GetByUserId(vm.user.id).then(function (testList) {
        vm.tests = testList;
      });
    }

    function deleteTest(testId) {
      $log.info("Deleting test");
      TestService.Delete(testId).then(function (response) {
        reloadTests();
      });
    }

    function confirmDelete(testId) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Eliminar un Test',
        template: '¿Está seguro?',
        cancelType: 'button-positive',
        okType: 'button-positive'
      });
      confirmPopup.then(function (res) {
        if (res) {
          deleteTest(testId);
        }
      });
    }
  }

  UserTestsController.$inject = ["$log", "$stateParams", "TestService", "UserService", "$ionicPopup"];
  angular.module('Training').controller('UserTestsController', UserTestsController);
})();
