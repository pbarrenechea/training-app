(function() {
  'use strict';
  angular.module('Training').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      .state('tab.users', {
        url: '/users',
        cache: false,
        views: {
          'tab-users': {
            templateUrl: 'views/users.list.html',
            controller: 'UsersController',
            controllerAs: 'users'
          }
        }
      }).state('tab.addUser',{
      url: '/editUser/:action/:id',
      cache:false,
      views: {
         'tab-users': {
          templateUrl: 'views/users.edit.html',
          controller: 'EditUserController',
          controllerAs: 'EditU'
        }
      }
    })
    .state('tab.userCalendar', {
      url: '/userCalendar/:userId',
      cache: false,
        views:{
          'tab-users': {
            templateUrl: 'views/user.calendar.html',
            controller: 'UserCalendarController',
            controllerAs: 'calendar'
          }
        }
    })
    .state('tab.userTests', {
      url: '/userTests/:userId',
      cache: false,
      views: {
        'tab-users': {
          templateUrl: 'views/user.tests.html',
          controller: 'UserTestsController',
          controllerAs: 'tests'
        }
      }
    })
    .state('tab.editTest', {
      url: '/editUserTest/:userId/:action/:id',
      cache: false,
      views: {
        'tab-users': {
          templateUrl: 'views/edit.test.html',
          controller: 'EditTestController',
          controllerAs: 'editTest'
        }
      }
    })
    .state('tab.userActivities', {
      url: '/editActivity/:userId/:date',
      views: {
        'tab-users': {
          templateUrl: 'views/activities.form.html',
          controller: 'ActivitiesController',
          controllerAs: 'activities'
        }
      }
    })
    .state('tab.sports', {
        url: '/sports',
        cache: false,
        views: {
          'tab-sports': {
            templateUrl: 'views/sports.list.html',
            controller: 'SportsController',
            controllerAs: 'sports'
          }
        }
      })
      .state('tab.editSport', {
        url: '/editSport/:action/:id',
        cache: false,
        views: {
          'tab-sports': {
            templateUrl: 'views/sports.edit.html',
            controller: 'EditSportController',
            controllerAs: 'EditS'
          }
        }
      })
      .state('tab.config', {
        url: '/config',
        cache: false,
        views: {
          'tab-config':{
            templateUrl: 'views/config.html',
            controller: 'ConfigController',
            controllerAs: 'config'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/users');
  });
})();
