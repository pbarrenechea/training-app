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
        },
        {
          name: 'sports',
          columns: [
            {name: 'id', type: 'integer primary key'},
            {name: 'name', type: 'text'}
          ]
        },
        {
          name: 'activity',
          columns:[
            {name: 'id', type: 'integer primary key'},
            {name: 'activity', type: 'text'},
            {name: 'time', type: 'text'},
            {name: 'distance', type: 'text'},
            {name: 'frequency', type: 'text'},
            {name: 'quantity', type: 'text'},
            {name: 'date', type: 'long'}
          ]
        }
      ]
    });
})();
