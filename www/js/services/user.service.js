/**
 * @ngdoc service
 * @name Training.FakeUserService
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
    .factory('UserService', UserService);

  UserService.$inject = ['DB', '$log'];
  function UserService( DB, $log) {

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
     * @methodOf Training.FakeUserService
     * @description
     * Returns a json array with all the users
     * @returns {array} array with all the users
     */
    function GetAll() {
      return DB.query('SELECT * FROM users')
        .then(function(result){
          return DB.fetchAll(result);
        });
    }
    /**
     * @ngdoc method
     * @name GetById
     * @methodOf Training.FakeUserService
     * @description
     * Returns a json with the user information
     * @param {string} id key of the user
     * @returns {object} user information
     */
    function GetById(id) {
      return DB.query('SELECT * FROM users where id = ' + i)
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
     * @methodOf Training.FakeUserService
     * @description
     * stores a user in localStorage
     * @param {object} user object with the user information
     * @returns {object} response of the operation
     */
    function Create(user) {
      var query = "INSERT INTO users (firstName, lastName, dob, email) VALUES (?,?,?,?)";
      return DB.query(query, [user.firstName, user.lastName, user.dob, user.email]).then(function(res){
        service.logger.log("Succesfully inserted");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Update
     * @methodOf Training.FakeUserService
     * @description
     * Updates a user
     * @param {object} user object with the user information
     * @returns {object} response of the operation
     */
    function Update(user) {
      /**
       * @TODO: query to update user
       */
    }

    /**
     * @ngdoc method
     * @name Delete
     * @methodOf Training.FakeUserService
     * @description
     * Updates a user
     * @param {string} id key of the user
     * @returns {object} response of the operation
     */
    function Delete(id) {
      return DB.query('DELETE FROM users where id = ' + id)
        .then(function(response){
          service.logger.log('Deleted user  ' + id)
        });
    }
  }
})();
