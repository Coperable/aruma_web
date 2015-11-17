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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/aruma', {
        templateUrl: 'views/aruma.html',
        controller: 'ArumaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
