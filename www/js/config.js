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
          name: 'activities',
          columns:[
            {name: 'id', type: 'integer primary key'},
            {name: 'userId', type: 'integer'},
            {name: 'activity', type: 'text'},
            {name: 'hours', type: 'long'},
            {name: 'minutes', type: 'long'},
            {name: 'seconds', type: 'long'},
            {name: 'distance', type: 'long'},//metres
            {name: 'frequency', type: 'long'},
            {name: 'quantity', type: 'long'},
            {name: 'doa', type: 'long'}//day of activity
          ]
        }
      ]
    });
})();
