/**
 * Created by Pablo Barrenechea on 28/12/2016.
 */
(function() {
  'use strict';

  /** @ngInject */
  function ConfigController($log, BackupService, $ionicLoading, FileService) {
    var vm = this;
    vm.backup = backup;
    vm.itemsToBackup = 3;
    vm.blockingModal = undefined;
    
    function cancelModal(){
      vm.itemsToBackup--;
      if( vm.itemsToBackup === 0 ){
        vm.itemsToBackup = 3;
        $ionicLoading.hide();
      }
    }

    function backup(){
      $ionicLoading.show({
        title: '',
        template: '<ion-spinner icon="android"></ion-spinner>',
      });
      BackupService.backupSports().then(cancelModal);
      BackupService.backupActivities().then(cancelModal);
      BackupService.backupUsers().then(cancelModal);
    }

  }
  ConfigController.$inject = ["$log", "BackupService", "$ionicLoading", "FileService"];
  angular.module('Training').controller('ConfigController', ConfigController);
})();
