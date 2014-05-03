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
    // directives
    'layoutManagerDirectives'
  ]);

spentApp.factory("DayDataService", function ($http) {
  var DayDataService = {
    async: function() {
        var promise = $http.get('../docs/days.json').then(function (response) {
          return response.data;
        });
        return promise;
    }
  };
 return DayDataService;
});

spentApp.factory("ScreenUpdateService", function ($rootScope) {
  var ScreenUpdateService = {};
  ScreenUpdateService.message = '';

  ScreenUpdateService.prepForBroadcast = function(msg) {
    this.message = msg;
    this.broadcastItem();
  };

  ScreenUpdateService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return ScreenUpdateService;
});



spentApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

