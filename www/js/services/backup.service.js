/**
 * @ngdoc service
 * @name Training.BackupService
 * @requires $log
 * @requires DB
 * @description
 * Generates backups for the different tables
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('BackupService', BackupService);

  BackupService.$inject = ['DB', '$log', 'SportService', 'UserService', 'ActivitiesService','FileService'];
  function BackupService( DB, $log, SportsService, UserService, ActivitiesService, FileService ) {

    var service = {};
    service.backupSports = backupSports;
    service.backupActivities = backupActivities;
    service.backupUsers = backupUsers;
    return service;

    function backupActivities(){
      var insertQuery = 'INSERT INTO activities (userId, activity, hours, minutes, seconds, distance, frequency, quantity, doa, rithym, pause, sort_order) VALUES ';
      return ActivitiesService.GetAll().then(function(activities){
        var strActivities = "";
        angular.forEach(activities, function(activity, key){
          strActivities += insertQuery + "( ";
          strActivities += "'" + activity.userId + "', ";
          strActivities += "'" + activity.activity + "', ";
          strActivities += "'" + activity.toa + "', ";
          strActivities += "'" + activity.distance + "', ";
          strActivities += "'" + activity.frequency + "', ";
          strActivities += "'" + activity.quantity + "', ";
          strActivities += "'" + activity.doa + "', ";
          strActivities += "'" + activity.rithym + "', ";
          strActivities += "'" + activity.pause + "', ";
          strActivities += "'" + activity.order + "'";
          strActivities += ")\n";
        });
        createFile("activities", strActivities);
      });
    }

    function backupUsers(){
      var insertQuery = "INSERT INTO users (firstName, lastName, dob, email, picture, dos) VALUES ";
      return UserService.GetAll().then(function(users){
        var strUsers = "";
        angular.forEach(users, function(user,key){
          strUsers +=  insertQuery + "( ";
          strUsers += "'" + user.firstName + "', ";
          strUsers += "'" + user.lastName + "', ";
          strUsers += "'" + user.dob + "', ";
          strUsers += "'" + user.email + "', ";
          strUsers += "'" + user.picture + "', ";
          strUsers += "'" + user.dos + "'";
          strUsers += ");\n";
        });
        createFile("users", strUsers);
      });
    }

    function backupSports(){
      var insertQuery = 'INSERT INTO sports (name) values ';
      return SportsService.GetAll().then(function(results){
        var strSports = "";
        angular.forEach(results, function(value, key) {
          strSports += insertQuery + "('" + value.name + "');\n";
        });
        createFile("sports", strSports);
      });
    }

    function createFile(key, content){
      var currentDate = new Date();
      var fileName = key + "-" + currentDate.getFullYear();
      fileName += "-" + (currentDate.getMonth() + 1);
      fileName += "-" + currentDate.getDate() + ".sql";
      FileService.createFile(fileName, content);
    }
  }
})();
