'use strict';

/**
 * @ngdoc overview
 * @name poliApp
 * @description
 * # poliApp
 *
 * Main module of the application.
 */
angular
  .module('poliApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'config',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/actividad', {
        templateUrl: 'views/actividad.html',
        controller: 'ActividadCtrl',
        controllerAs: 'actividad'
      })
      .when('/proyecto', {
        templateUrl: 'views/proyecto.html',
        controller: 'ProyectoCtrl',
        controllerAs: 'proyecto'
      })
      .when('/emprendimiento', {
        templateUrl: 'views/emprendimiento.html',
        controller: 'EmprendimientoCtrl',
        controllerAs: 'emprendimiento'
      })
      .when('/organizations/:id', {
        templateUrl: 'views/emprendimiento.html',
        controller: 'organization-controller'
      })
      .when('/activities/:id', {
        templateUrl: 'views/actividad.html',
        controller: 'activity-controller'
      })

      .when('/aruma', {
        templateUrl: 'views/aruma.html',
        controller: 'ArumaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      moment.locale('es');

  })
.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
});
