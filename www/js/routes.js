(function() {
  'use strict';
  angular.module('Training').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: '../views/tabs.html'
      })
      .state('tab.users', {
        url: '/users',
        cache: false,
        views: {
          'tab-users': {
            templateUrl: '../views/users.list.html',
            controller: 'UsersController',
            controllerAs: 'users'
          }
        }
      }).state('tab.addUser',{
      url: '/editUser/:action/:id',
      cache:false,
      views: {
         'tab-users': {
          templateUrl: '../views/users.edit.html',
          controller: 'EditUserController',
          controllerAs: 'EditU'
        }
      }
    })
    .state('tab.userCalendar', {
      url: '/userCalendar/:userId',
        views:{
          'tab-users': {
            templateUrl: '../views/user.calendar.html',
            controller: 'UserCalendarController',
            controllerAs: 'calendar'
          }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/users');
  });
})();
