(function() {
  'use strict';

  /** @ngInject */
  function SportsController( $log, SportService, $ionicFilterBar, $location, $ionicPopup) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.sportList = [];

    /**
     * Methods
     */
    //vm.showFilterBar = showFilterBar;
    //vm.filterBar;
    vm.confirmDelete = confirmDelete;
    vm.showFilterBar = showFilterBar;

    reloadSports();

    function reloadSports(){
      return SportService.GetAll().then(function(results){
        vm.sportList = results;
      });
    }

    function deleteSport(sportId){
      vm.logger.log("Deleting sport");
      SportService.Delete(sportId).then(function(response){
        reloadSports();
      });
    }

    function confirmDelete( sportId){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Eliminar un Deporte',
        template: '¿Está seguro?',
        cancelType: 'button-positive',
        okType: 'button-positive'
      });
      confirmPopup.then(function (res) {
        if (res) {
          deleteSport(sportId);
        }
      });
    }

    function showFilterBar(){
      vm.logger.log("Triggering filter bar");
      vm.filterBar = $ionicFilterBar.show({
        items: vm.sportList,
        expression: function (filterText, value) {
          return value.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;},
        update: function (filteredItems, filterText) {
          vm.sportList = filteredItems;
        }
      });
    }
  };

  SportsController.$inject = ["$log", "SportService","$ionicFilterBar", "$location", "$ionicPopup"];
  angular.module('Training').controller('SportsController',SportsController);
})();
