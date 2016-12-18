/**
 * Created by Usuario on 04/12/2016.
 */

(function() {
  'use strict';

   function ActivitiesController($log, ActivitiesService, $stateParams, UserService, SportService, $location) {
     /** Attributes **/
     var vm = this;
     vm.user = {};
     vm.activities = [];
     vm.userId;
     vm.activityDate;
     vm.dateReadOnly = false;
     vm.sports = [];
     /** methods **/
     vm.save = save;
     vm.addActivity = addActivity;
     vm.toggleActivityVisibility = toggleActivityVisibility;
     vm.deleteActivity = deleteActivity;

     init();

     function addActivity() {
       vm.activities.push({
         userId: vm.userId,
         visible: true,
         hours: 0,
         minutes: 0,
         seconds: 0,
         distance: 0,
         frequency: 0,
         quantity: 0,
         rithym: '',
         pause: ''
       });
     }

     function deleteActivity(index) {
       vm.activities.splice(index, 1);
     }

     function initUser() {
       vm.userId = $stateParams.userId;
       if (vm.userId !== "") {
         UserService.GetById(vm.userId).then(function (user) {
           vm.user = user;
         });
       }
     }

     function initActivities() {
       vm.userId = $stateParams.userId;
       var doa = $stateParams.date;
       if (vm.userId !== '') {
         if ( doa !== '') {
           vm.activityDate = new Date(Number(doa));
           vm.dateReadOnly = true;
           ActivitiesService.getActiviesByDay(vm.userId, doa).then(function (result) {
             vm.activities = result;
           });
         } else {
           $log.info("date is empty, the user is creating a new plan");
         }
       } else {
         $log.error("User empty!!!!");
       }
     }

     function toggleActivityVisibility(index) {
       if (vm.activities[index] !== undefined) {
         vm.activities[index]["visible"] = !vm.activities[index]["visible"];
       }
     }

     function initSports() {
       SportService.GetAll().then(function (results) {
         vm.sports = results;
       });
     }

     function init() {
       initUser();
       initActivities();
       initSports();
     }

     function save(form) {
       if (form.$valid) {
         vm.doa = vm.activityDate.getTime();
         ActivitiesService.deleteActivitiesByDate(vm.userId, vm.doa).then(function () {
           vm.elementsToInsert = vm.activities.length;
           vm.activities.forEach(function (element, index) {
             var newActivity = angular.copy(element);
             newActivity.doa = vm.doa;
             newActivity.userId = vm.userId;
             newActivity.sort_order = index;
             ActivitiesService.Create(newActivity).then(function (response) {
               $log.info("Succesfully inserted element");
               vm.elementsToInsert--;
               $log.info("To insert: " + vm.elementsToInsert);
               if( vm.elementsToInsert === 0 ){//If all elements were inserted, redirect
                 $location.path("/tab/userCalendar/" + vm.userId );
               }
             });
           });
         });
       }
     }
   }
  ActivitiesController.$inject = ['$log', 'ActivitiesService', '$stateParams', 'UserService', 'SportService', '$location'];
  angular.module('Training').controller('ActivitiesController', ActivitiesController);
})();
