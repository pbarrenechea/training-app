(function(){
  angular.module('Training')
    .factory('DB', DBService);
  DBService.$inject = ['$q', 'DB_CONFIG', '$log'];
  function DBService($q, DB_CONFIG, $log) {
    var self = this;
    self.db = null;
    self.logger = $log;

    self.init = function() {
      // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
      self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
      angular.forEach(DB_CONFIG.tables, function(table) {
        var columns = [];
        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });
        var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        self.query(query);
        self.logger.log('Table ' + table.name + ' initialized');
      });
    };

    self.query = function(query, bindings) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      var deferred = $q.defer();

      self.db.transaction(function(transaction) {
        transaction.executeSql(query, bindings, function(transaction, result) {
          deferred.resolve(result);
        }, function(transaction, error) {
          deferred.reject(error);
        });
      });
      return deferred.promise;
    };

    self.fetchAll = function(result) {
      var output = [];
      for (var i = 0; i < result.rows.length; i++) {
        output.push(angular.copy(result.rows.item(i)));
      }
      return output;
    };

    self.fetch = function(result) {
      return result.rows.item(0);
    };

    self.checkColumns = function() {
      angular.forEach(DB_CONFIG.tables, function (table) {
        var query = 'SELECT * FROM ' + table.name + " LIMIT 1";
        self.query(query).then(function (result) {
          var firstRow;
          if (result.rows.length > 0) {
            firstRow = result.rows[0];
          } else {
            return;
          }
          angular.forEach(table.columns, function (column) {
            if (!(column.name in firstRow)) {
              var alterQuery = "alter table " + table.name + " add column " + column.name + " " + column.type + ";";
              $log.info(alterQuery);
              self.query(alterQuery).then(function () {
                $log.info("Altered table");
              });
            }
          });
        });
      });
    }
    return self;
  };
})();
