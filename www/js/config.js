(function(){
  angular.module('Training')
    .constant('DB_CONFIG', {
      name: 'DB',
      tables: [
        {
          name: 'users',
          columns: [
            {name: 'id', type: 'integer primary key'},
            {name: 'firstName', type: 'text'},
            {name: 'lastName', type: 'text'},
            {name: 'dob', type: 'long'},
            {name: 'email', type: 'text'},
            {name: 'picture', type: 'text'}
          ]
        }
      ]
    });
})();
