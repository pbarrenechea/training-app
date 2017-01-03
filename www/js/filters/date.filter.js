(function(){
  angular.module('Training')
    .filter('customdate', function(){
      return function(time) {
        var decoratedDate = new Date(time);
        return decoratedDate.toLocaleDateString();
      }
    });
})();
