(function() {
  'use strict';
  angular
    .module('Training')
    .directive('activityFields', function () {
      return {
        restrict: 'E',
        templateUrl: 'views/activity-fields.directive.html',
        scope: {
          'sports': '=sports',
          'activity': '=activity',
          'index': '=index',
          'toggle': '&',
          'delete': '&'
        },
        controller: function($scope){
          $scope.toggleActivity = function($index){
            $scope.toggle()($index);
          };
          $scope.deleteActivity = function($index){
            $scope.delete()($index);
          }
        }
      }
    });
})();
