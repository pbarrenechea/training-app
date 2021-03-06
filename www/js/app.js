// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Training', ['ionic', 'jett.ionic.filter.bar',
  'ui.rCalendar', 'ion-profile-picture', 'ngMessages', /*'ngCordova','ngCordova.plugins.file'*/])
  .config(function($ionicConfigProvider){
    //$ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.backButton.text(false);
  })
.run(function($ionicPlatform, DB) {
  DB.init();
});
