/**
 * Created by Usuario on 04/12/2016.
 */

(function() {
  'use strict';

   function ActivitiesController($log, ActivitiesService, $stateParams, UserService, SportService) {
     /** Attributes **/
     var vm = this;
     vm.user = {};
     vm.activities = [];
     vm.userId;
     vm.activityDate;
     vm.action;
     vm.sports = [];
     /** methods **/
     vm.save = save;
     vm.addActivity = addActivity;
     vm.toggleActivityVisibility = toggleActivityVisibility;
     vm.deleteActivity = deleteActivity;

     init();

     function addActivity(){
       vm.activities.push( { userId: vm.userId,
        visible: true,
        hours: 0,
        minutes:0,
        seconds: 0,
        distance: 0,
        frequency: 0,
        quantity: 0
       });
     }

     function deleteActivity(index){
       vm.activities.splice(index,1);
     }

     function initUser(){
       vm.userId = $stateParams.userId;
       if( vm.userId !== "" ){
         UserService.GetById(vm.userId).then(function(user){
           vm.user = user;
         });
       }
     }

     function initActivities(){
       vm.action = $stateParams.action;
       vm.userId = $stateParams.userId;
       vm.activityDate = $stateParams.date;
       if( vm.userId !== '' ){
          if( vm.activityDate !== '' ){
             ActivitiesService.getActiviesByDay(vm.userId, vm.activityDate).then(function(result){
               vm.activities = result;
             });
          }else{
            $log.info("date is empty, the user is creating a new plan");
          }
       }else{
         $log.error("User empty!!!!");
       }
     }

     function toggleActivityVisibility(index){
       if( vm.activities[index] !== undefined ){
         vm.activities[index]["visible"] = !vm.activities[index]["visible"];
       }
     }

     function initSports(){
        SportService.GetAll().then(function(results){
          vm.sports = results;
        });
     }

     function init(){
        initUser();
        initActivities();
        initSports();
     }

     function save(form){
       if( form.$valid ){
         vm.doa = vm.activityDate.getTime();
         if( vm.action === "new" ){
           ActivitiesService.deleteActivitiesByDate(vm.userId, vm.doa).then(function(){
              vm.activities.forEach(function(element){
                element.doa = vm.doa;
                element.userId = vm.userId;
                ActivitiesService.Create(element).then( function(response){
                  $log.info("Succesfully inserted element");
                });
              });
           });
         }
       }
     }

   }

  ActivitiesController.$inject = ['$log', 'ActivitiesService', '$stateParams', 'UserService', 'SportService'];
  angular.module('Training').controller('ActivitiesController', ActivitiesController);
})();
