/**
 * @ngdoc service
 * @name Training.ActivitiesService
 * @requires $log
 * @requires DB
 * @description
 * Handles the communictation between the activies data base table and
 * the front end
 */

(function () {
  'use strict';
  angular
    .module('Training')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['DB', '$log'];
  function ActivitiesService( DB, $log) {

    var service = {};
    service.logger = $log;
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    service.getActiviesByDay = getActiviesByDay;
    service.getActivitiesByRange = getActivitiesByRange;
    service.deleteActivitiesByDate = deleteActivitiesByDate;
    service.deleteUserActivities = deleteUserActivities;

    return service;
    /**
     * @ngdoc method
     * @name GetAll
     * @methodOf Training.ActivitiesService
     * @description
     * Returns a json array with all the activities
     * @returns {array} array with all the activities
     */
    function GetAll() {
      return DB.query('SELECT * FROM activities')
        .then(function(result){
          return DB.fetchAll(result);
        });
    }

    /**
     * @ngdoc method
     * @name getActivitiesByRange
     * @methodOf Training.ActivitiesService
     * @description
     * Returns a json array with all the user activities activities on the selected range
     * @param userId
     * @param startDate
     * @param endDate
     * @returns {array}
     */
    function getActivitiesByRange(userId, startDate, endDate){
      return DB.query('SELECT * from activities where userId = ' + userId + ' and ( doa >= ' + startDate + " and doa <= " + endDate + ")" )
        .then(function(result){
          return DB.fetchAll(result);
        });
    }

    function getActiviesByDay(userId, date){
      return DB.query('SELECT * from activities where userId = ' + userId + ' and doa = ' + date )
        .then(function(result){
          return DB.fetchAll(result);
        });
    }

    /**
     * @ngdoc method
     * @name GetById
     * @methodOf Training.ActivitiesService
     * @description
     * Returns a json with the activity information
     * @param {string} id key of the activity
     * @returns {object} activity information
     */
    function GetById(id) {
      return DB.query('SELECT * FROM activities where id = ' + id)
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
     * @methodOf Training.ActivitiesService
     * @description
     * stores an activity in data base
     * @param {object} activity object with the activity information
     * @returns {object} response of the operation
     */
    function Create(activity) {
      var query = "INSERT INTO activities (userId, activity, hours, minutes, seconds, distance, frequency, quantity, doa) VALUES (?,?,?,?,?,?,?,?,?)";
      return DB.query(query, [activity.userId, activity.activity, activity.hours, activity.minutes, activity.seconds, activity.distance, activity.frequency, activity.quantity, activity.doa]).then(function(res){
        service.logger.log("Succesfully inserted");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Update
     * @methodOf Training.ActivitiesService
     * @description
     * Updates an activity
     * @param {object} activity object with the activity information
     * @returns {object} response of the operation
     */
    function Update(activity) {
      var query = "UPDATE activities set userId = " + activity.userId + "', activity = '" + activity.activity + "'";
      query += ", toa = '" + activity.toa + "', distance = '" + activity.distance + "' ";
      query += ", frequency = '" + activity.frequency + "', ";
      query += " quantity = '" + activity.quantity + "', ";
      query += " doa  = " + activity.doa;
      query += " WHERE id = " + activity.id;
      return DB.query(query).then(function(res){
        service.logger.log("Succesfully updated");
      }, function(err){
        service.logger.error(err);
      });
    }

    /**
     * @ngdoc method
     * @name Delete
     * @methodOf Training.ActivitiesService
     * @description
     * Updates an activity
     * @param {string} id key of the activity
     * @returns {object} response of the operation
     */
    function Delete(id) {
      return DB.query('DELETE FROM activities where id = ' + id)
        .then(function(response){
          service.logger.log('Deleted activity  ' + id)
        });
    }

    /**
     * @ngdoc method
     * @name deleteActivitiesByDate
     * @methodOf Training.ActivitiesService
     * @description
     * Deletes all the activities for a user in a date
     * @param {number} userId id of the user
     * @param {number} date time representation for the selected day
     * @returns {object} response of the operation
     */
    function deleteActivitiesByDate(userId, date) {
      return DB.query('DELETE FROM activities where userId = ' + userId + ' and doa = ' + date)
        .then(function(response){
          $log.log(response);
        });
    }

    /**
     * @ngdoc method
     * @name deleteUserActivities
     * @methodOf Training.ActivitiesService
     * @description
     * Deletes all the activities for a user
     * @param {number} userId id of the user
     * @returns {object} response of the operation
     */
    function deleteUserActivities(userId){
      return DB.query('DELETE FROM activities where userId = ' + userId)
        .then(function(response){
          $log.log(response);
        });
    }

  }
})();
