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
        controllerAs: 'main',
        resolve: function() {
            console.log('resolve');
            window.loading_screen = window.pleaseWait({
                backgroundColor: '#59BC6C',
                loadingHtml: "<div class='sk-double-bounce'> <div class='sk-child sk-double-bounce1'></div> <div class='sk-child sk-double-bounce2'></div> </div><h1>Aruma <small>LAB</small></h1>"
            });


        }
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
      .when('/centers/:id', {
        templateUrl: 'views/center.html',
        controller: 'center-controller'
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
  })
.run(function($rootScope) {
    moment.locale('es');

})
.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).locale('es').format(format);
    };
});
