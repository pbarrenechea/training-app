(function() {
  'use strict';

  /** @ngInject */
  function SportsController( $log, SportService, $ionicFilterBar, $location) {
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
    vm.deleteSport = deleteSport;
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

  SportsController.$inject = ["$log", "SportService","$ionicFilterBar", "$location"];
  angular.module('Training').controller('SportsController',SportsController);
})();
