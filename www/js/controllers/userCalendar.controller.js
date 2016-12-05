(function() {
  'use strict';

  /** @ngInject */
  function UserCalendarController($stateParams, $log, UserService, ActivitiesService, $location) {
    var vm =  this;
    /**
     * Attributes
     */
    vm.logger = $log;
    vm.user = {};
    vm.currentDate = new Date();
    vm.title = "";
    vm.mode = "";
    vm.queryMode = "remote";
    vm.userActivities = [];
    vm.startTime;
    vm.endTime;

    vm.onViewTitleChanged = onViewTitleChanged;
    vm.onRangeChanged = onRangeChanged;
    vm.loadActivities = loadActivities;
    vm.editDayActivities = editDayActivities;

    init();

    function init(){
      vm.user.id = $stateParams.userId;
      if( vm.user.id !== "" ){
        UserService.GetById(vm.user.id).then(function(user){
          for(var k in user){
            vm.user[k] = user[k];
          }
          vm.user.dobTmp = new Date(Number(vm.user.dob));
        });
      }
    }

    function editDayActivities(event){
      $log.info("Editing activities");
      $location.path("/tab/editActivity/" + vm.user.id + "/" + event.doa);
    }

    function onViewTitleChanged(newTitle){
      vm.title = newTitle;
    }

    function onRangeChanged(startTime, endTime){
      vm.logger.info("onRangeChanged called");
      loadActivities(startTime.getTime(), endTime.getTime())
    }

    function loadActivities(startTime, endTime){
      ActivitiesService.getActivitiesByRange(vm.user.id, startTime, endTime).then(function(activities){
        vm.userActivities = activities;
        for( var i = 0; i < vm.userActivities.length; i++ ){
          vm.userActivities[i].startTime = new Date(Number(vm.userActivities[i].doa));
          vm.userActivities[i].endTime = new Date(Number(vm.userActivities[i].doa)) + 1;
          vm.userActivities[i].allDay = true;
          vm.userActivities[i].title ="<b>" + vm.userActivities[i].activity + ":</b> <br>";
          vm.userActivities[i].title += "Tiempo: " + vm.userActivities[i].hours + " horas ";
          vm.userActivities[i].title +=  vm.userActivities[i].minutes + " minutos ";
          vm.userActivities[i].title +=  vm.userActivities[i].seconds + " segundos <br>";
          vm.userActivities[i].title +=  "Distancia: " + vm.userActivities[i].distance + " metros <br>";
          vm.userActivities[i].title +=  "Series: " + vm.userActivities[i].frequency + "<br>";
          vm.userActivities[i].title +=  "Repeticiones: " + vm.userActivities[i].quantity;
        }
      });
    }

  };

  UserCalendarController.$inject = ["$stateParams", "$log", "UserService", "ActivitiesService", '$location'];
  angular.module('Training').controller('UserCalendarController',UserCalendarController);
})();
