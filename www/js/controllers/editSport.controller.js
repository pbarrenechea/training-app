(function() {
  'use strict';

  /** @ngInject */
  function EditSportController($log, SportService, $stateParams, $location) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.sport = {};
    /**
     * Methods
     */
    vm.save = save;

    init();

    function init(){
      vm.sport.action = $stateParams.action;
      vm.sport.id = $stateParams.id;
      if( vm.sport.id !== "" ){
        SportService.GetById(vm.sport.id).then(function(sport){
          for(var k in sport){
            vm.sport[k] = sport[k];
          }
        });
      }
    }

    function updateCallback(){
      vm.logger.log("Sport created succesfully");
      vm.sport = {};
      $location.path("/tab/sports");
    }

    function createSport(){
      SportService.Create(vm.sport).then(updateCallback);
    }

    function updateSport(){
      SportService.Update(vm.sport).then(updateCallback)
    }

    function save(form){
      if( form.$valid ){
        if( vm.sport.action === "new" ){
          createSport();
        }else{
          updateSport();
        }
      }
    }
  };


  EditSportController.$inject = ["$log", "SportService","$stateParams", "$location"];
  angular.module('Training').controller('EditSportController',EditSportController);
})();
