(function() {
  'use strict';

  /** @ngInject */
  function UserCalendarController($stateParams, $log, UserService, ActivitiesService) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.user = {};
    vm.currentDate = new Date();
    vm.title = "";
    vm.mode = "";
    vm.eventSource = [];

    vm.onViewTitleChanged = onViewTitleChanged;
    vm.userActivities = [];
    vm.loadActivities = loadActivities;

    init();

    function init(){
      vm.user.id = $stateParams.userId;
      if( vm.user.id !== "" ){
        UserService.GetById(vm.user.id).then(function(user){
          for(var k in user){
            vm.user[k] = user[k];
          }
          vm.user.dobTmp = new Date(Number(vm.user.dob));
          loadActivities();
        });
      }
    }

    function onViewTitleChanged(newTitle){
      vm.title = newTitle;
    }

    function loadActivities(){
      //vm.userActivities = createRandomEvents();
      /**
       * @TODO: see how the current month is calculated
       */
      ActivitiesService.GetAll(vm.user.id, 1480820400000).then(function(activities){
        vm.userActivities = activities;
        for( var i = 0; i < vm.userActivities.length; i++ ){
          vm.userActivities[i].startTime = new Date(Number(vm.userActivities[i].doa));
          vm.userActivities[i].endTime = new Date(Number(vm.userActivities[i].doa)) + 1;
          vm.userActivities[i].allDay = true;
          vm.userActivities[i].title = vm.userActivities[i].activity;
        }
      });
    }

  };

  UserCalendarController.$inject = ["$stateParams", "$log", "UserService", "ActivitiesService"];
  angular.module('Training').controller('UserCalendarController',UserCalendarController);
})();
