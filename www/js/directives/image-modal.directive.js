
(function() {
  'use strict';
  angular
    .module('Training')
    .directive('imageModal', function () {
      return {
      restrict: 'E',
        templateUrl: 'views/image-modal.directive.html',
        scope: {
        'source': '=source'
      },
      controller: function($scope, $ionicModal){
        $scope.defaultImg = 'img/icon-user-default.png';
        $ionicModal.fromTemplateUrl('image-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.openModal = function() {
          $scope.modal.show();
        };

        $scope.closeModal = function() {
          $scope.modal.hide();
        };

        $scope.getImageSource = function(){
          if( $scope.source !== 'undefined' ){
            return $scope.source;
          }else{
            return $scope.defaultImg;
          }
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
        });
        $scope.$on('modal.shown', function() {
          console.log('Modal is shown!');
        });

        $scope.showImage = function() {
          $scope.openModal();
        }
      }
    }
  });
})();
