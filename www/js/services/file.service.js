/**
 * @ngdoc service
 * @name Training.FileService
 * @description
 * Interface the file system to the rest of the app
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('FileService', FileService);

  FileService.$inject = ['$cordovaFile', '$log'];
  function FileService($cordovaFile, $log) {
    var service = {};
    service.createFile = createFile;
    return service;

    function createFile(fileName, content){
     return  $cordovaFile.createFile(cordova.file.externalDataDirectory, fileName, true).then(function(file){
        $log.info("File created!!!");
       file.createWriter(function(fileWriter) {
         fileWriter.seek(fileWriter.length);
         var blob = new Blob([content], {type:'text/plain'});
         fileWriter.write(blob);
         $log.info("ok, in theory i worked");
       }, function(err){
         $log.error(err);
       });

      }).catch(function(error){
        $log.error(error)
      });
    }
  }
})();
