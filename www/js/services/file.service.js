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
       file.createWriter(function(fileWriter) {//Attaching callback, this will execute after the truncate below
         fileWriter.onwriteend = function(evt) {//After truncating, file gets overridden
           $log.info("Startig writing");
           fileWriter.seek(0);
           var blob = new Blob([content], {type:'text/plain'});
           fileWriter.onwriteend = function(evt){
             $log.info("Finished writing " + fileName);
           };
           fileWriter.write(blob);

           $log.info("File modified succesfully");
         };
         fileWriter.truncate(0);
       }, function(err){
         $log.error(err);
       });

      }).catch(function(error){
        $log.error(error)
      });
    }
  }
})();
