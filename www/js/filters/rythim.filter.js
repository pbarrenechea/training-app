(function(){
  angular.module('Training')
    .filter('rythim', function(){
      return function(distance, obj) {
        var totalSegs = obj.minutes*60 + obj.seconds;
        var segsPerKm = totalSegs/distance;
        var resultingMinutes = Math.floor( segsPerKm / 60);
        var resultingSegs = Math.floor(segsPerKm - resultingMinutes * 60);
        return resultingMinutes + "m " + resultingSegs + "s / Km";
      }
    });
})();
