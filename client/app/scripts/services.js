angular.module('poliApp')
.factory('Organization',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/organizations/:id', { id:'@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Center',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/centers/:id', { id:'@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Page',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/pages/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Activity',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/activities/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}]);
