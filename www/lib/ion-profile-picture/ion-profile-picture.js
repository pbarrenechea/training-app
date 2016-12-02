angular.module('ion-profile-picture', [])
  .directive('ionProfilePicture', [
    '$ionicTemplateLoader',
    '$ionicBackdrop',
    '$q',
    '$timeout',
    '$rootScope',
    '$document',
    function($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $document) {
      return {
        require: '?ngModel',
        restrict: 'E',
        template: '<div class="ion-profile-picture no-picture"><input type="file" accept="image/*" capture /> <canvas class="ion-profile-picture-canvas" id="tempCanvas"></canvas> </div>',
        replace: true,
        link: function(scope, element, attrs, ngModel) {
          var $input = angular.element(element.find('input'));
          var file = undefined;
          if(!ngModel){
            console.error('ion-profile-picture:', 'Need to set ng-model');
            return false;
          }
          // all this guy does is trigger a click event on the hidden file input
          var openFileDialog = function(e){
            $input[0].click();
          };

          // every time the file gets updated, this guy does it's thing
          var onFilePick = function(e){
            var reader = new FileReader();
            reader.onload = function(_e){
              scope.$apply(function(){
                var img = document.createElement("img");
                img.src = _e.target.result;
                var canvas = document.getElementById('tempCanvas');
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 200;
                var MAX_HEIGHT = 200;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL("image/png");
                ngModel.$setViewValue(dataurl);
                ngModel.$render();
              })
            };

            file = e.target.files[0];

            if(file){
              // we read the data from our selected image to get the Base64
              // and use it as our element background
              reader.readAsDataURL(file);
            }
          };

          ngModel.$formatters.unshift(function (modelValue) {
              if (!modelValue) return '';
              return modelValue;
          });

          ngModel.$parsers.unshift(function (viewValue) {
              return viewValue;
          });

          ngModel.$render = function(){
            var value = ngModel.$viewValue;

            if(!value){
              element.css({
                'background-image': 'none'
              });
              element.addClass('no-picture');
            } else {
              // if our value is just a plain Base64 string, we will try
              // to be helpful and prepend the right stuff to it
              if(!value.match(/^data:.*?;base64,/i)){
                value = 'data:image/jpg;base64,' + value;
              }

              element.css({
                'background-image': 'url(' + value + ')'
              });
              element.removeClass('no-picture');
            }
          };

          element.on('click', openFileDialog);
          $input.on('change', onFilePick);
        }
      };
    }
  ]);
