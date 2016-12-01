/**
 * @ngdoc service
 * @name Training.SportService
 * @requires $timeout
 * @requires $filter
 * @requires $q
 * @description
 * Mocks a User service by using the localStorage browser feature
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('SportService', SportService);

  SportService.$inject = ['DB', '$log'];
  function SportService( DB, $log) {

    var service = {};
    service.logger = $log;
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;
    /**
     * @ngdoc method
     * @name GetAll
     * @methodOf Training.SportService
     * @description
     * Returns a json array with all the sports
     * @returns {array} array with all the sports
     */
    function GetAll() {
      return DB.query('SELECT * FROM sports')
        .then(function(result){
          return DB.fetchAll(result);
        });
    }

    /**
     * @ngdoc method
     * @name GetById
     * @methodOf Training.SportService
     * @description
     * Returns a json with the sport information
     * @param {string} id key of the sport
     * @returns {object} sport information
     */
    function GetById(id) {
      return DB.query('SELECT * FROM sports where id = ' + id)
        .then(function(result){
          if(result.rows.length > 0){
            return DB.fetch(result);
          }else{
            return undefined;
          }
        });
    }

    /**
     * @ngdoc method
     * @name Create
     * @methodOf Training.SportService
     * @description
     * stores a sport in data base
     * @param {object} sport object with the sport information
     * @returns {object} response of the operation
     */
    function Create(sport) {
      var query = "INSERT INTO sports (name) VALUES (?)";
      return DB.query(query, [sport.name]).then(function(res){
        service.logger.log("Succesfully inserted");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Update
     * @methodOf Training.SportService
     * @description
     * Updates a sport
     * @param {object} sport object with the sport information
     * @returns {object} response of the operation
     */
    function Update(sport) {
      var query = "UPDATE sports set mame = '" + sport.name + "' ";
      query += " WHERE id = " + sport.id;
      return DB.query(query).then(function(res){
        service.logger.log("Succesfully updated");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Delete
     * @methodOf Training.SportService
     * @description
     * Updates a sport
     * @param {string} id key of the sport
     * @returns {object} response of the operation
     */
    function Delete(id) {
      return DB.query('DELETE FROM sports where id = ' + id)
        .then(function(response){
          service.logger.log('Deleted sport  ' + id)
        });
    }
  }
})();
