'use strict';

var spentApp = angular.module('spentApp', [
    'matchmedia-ng',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    // controllers
    'mainController',
    'challengeControllers',
    'optionControllers',
    'rescueControllers',
    'bankBalanceControllers',
    'canvasControllers',
    'dayListControllers',
    'playerControllers',
    // directives
    'layoutManagerDirectives',
    // services
    'eventBusService',
    'gameStateService',
    'DayDataService'

  ]);

spentApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .when('/#/', {
      templateUrl: 'views/partials/singleChallenge.html',
      controller: 'ChallengeController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

