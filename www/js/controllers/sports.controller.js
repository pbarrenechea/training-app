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
  };


  SportsController.$inject = ["$log", "SportService","$ionicFilterBar", "$location"];
  angular.module('Training').controller('SportsController',SportsController);
})();
