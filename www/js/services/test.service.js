/**
 * @ngdoc service
 * @name Training.TestService
 * @description
 * Manage the speed tests entities
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('TestService', TestService);

  TestService.$inject = ['DB', '$log'];
  function TestService( DB, $log) {

    var service = {};
    service.logger = $log;
    service.GetById = GetById;
    service.GetByUserId = GetByUserId;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    return service;
    /**
     * @ngdoc method
     * @name GetByUserId
     * @methodOf Training.TestService
     * @description
     * Returns a json array with all the the tests that belong to a user
     * @param userId: integer
     * @returns {array} array with all the users
     */
    function GetByUserId(userId) {
      return DB.query('SELECT * FROM speed_tests where user_id = ' + userId + " order by dot DESC")
        .then(function(result){
          return DB.fetchAll(result);
        });
    }

    /**
     * @ngdoc method
     * @name GetById
     * @methodOf Training.TestService
     * @description
     * Returns a json with the speed test information
     * @param {string} id key of the speed test
     * @returns {object} user information
     */
    function GetById(id) {
      return DB.query('SELECT * FROM speed_tests where id = ' + id)
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
     * @methodOf Training.TestService
     * @description
     * stores a speed test in data base
     * @param {object} speed test object with the information
     * @returns {object} response of the operation
     */
    function Create(test) {
      var query = "INSERT INTO speed_tests (user_id, dot, distance, minutes, seconds) VALUES (?,?,?,?,?)";
      return DB.query(query, [test.user_id, test.dot, test.distance, test.minutes, test.seconds]).then(function(res){
        service.logger.log("Succesfully inserted");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Update
     * @methodOf Training.TestService
     * @description
     * Updates a speed test
     * @param {object} test object with the information to update
     * @returns {object} response of the operation
     */
    function Update(test) {
      var query = "UPDATE speed_tests set user_id = " + test.user_id + ", dot = " + test.dot;
      query += ", distance = " + test.distance + ", minutes = " + test.minutes;
      query += ", seconds = " + test.seconds;
      query += " WHERE id = " + test.id;
      return DB.query(query).then(function(res){
        service.logger.log("Succesfully updated");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Delete
     * @methodOf Training.TestService
     * @description
     * deletes a speed test
     * @param {string} id key of the speed test
     * @returns {object} response of the operation
     */
    function Delete(id) {
      return DB.query('DELETE FROM speed_tests where id = ' + id)
        .then(function(response){
          service.logger.log('Deleted speed_test  ' + id)
        });
    }
  }
})();
