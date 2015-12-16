
/**
 * @ngdoc overview
 * @name pureprofiletechtestApp
 * @description
 * # created by Jacob on 9/12/2015
 * # pureprofiletechtestApp
 *
 * Main module of the application.
 */

(function(){
'use strict';

// Define a module

var app = angular
    .module('pureprofiletechtestApp', [
      'common.services',
      'common.directives',
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngRoute',
      'mainResourceMock',
      'angularCharts',
      'ngJustGage'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

}());
