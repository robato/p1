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
    'layoutManagerDirectives'
  ]);


spentApp.factory('gameState',  ['$rootScope', 'EventBus', function ($rootScope, EventBus) {

  var gameState = {};
  var EventBus = EventBus;
  gameState.jobStrikes = {
    'strikeOne': 'false',
    'strikeTwo': 'false',
    'strikeThree': 'false'
  };
  gameState.currentDayIndex = 0;
  gameState.currentDayIndexInt = parseInt(gameState.currentDayIndex);
  gameState.isSoundOn = false;
  gameState.debugMode = true;
  gameState._daysInMonth = 30;
  gameState.currentBankBalance = 1000;

  gameState._initGame = function() {
    console.log("initialized game.");
  };

  gameState._init = function() {
    this._initGame();
    this._initialized = true;
  };
  gameState.getJobs = function() {
        console.log("choose job");
  };          
  gameState.getPlacesToLive = function () {
        console.log("choose place to live");
  };
  gameState.decideWhatToDoWithExtraStuff = function() {
        this._player.creditAccount(10);
        console.log("extra stuff");
  };
  gameState.chooseHealthInsurance = function() {
        this._player.optInToInsurance();
        console.log("choose health insurance");
  };
  gameState.daysInMonth = function() {
        return ( this._daysInMonth );
  };
  gameState.endOfTheMonth = function() {
        return ( this._currentDay > this._daysInMonth );
  };
  gameState.getCurrentDay = function() {
        return this._currentDay;
  };
  gameState.nextDay = function() {
        ++gameState.currentDayIndexInt;
        console.log("incremented day");
  };
  gameState.onChallengeSelected = function (challenge) {
  };
  gameState.showState = function() {
        console.log(JSON.stringify($scope.state));
  };
  gameState.start = function() {
        this._init();
  };
  gameState.getChallenge = function() {

        if(!this._initialized) {
          throw new Error("you must first start the game");
        }

        return ( this.endOfTheMonth() ? null : this._challengeRepository.getNextChallenge() );
  };
  gameState.optionSelected = function(option) {
    var self = this,
      optionObject = null;
    // get option
    optionObject = self._optionRepository.getOptionWithID(option['@id']);

    if(optionObject !== null) {

      if(optionObject.removeChallenge !== null ) {
        // remove challenges
        self._challengeRepository.removeChallenges(optionObject.removeChallenge.challenge);
      }

      if(optionObject.addChallenge !== null) {
        // add challenges
        self._challengeRepository.addChallenges(optionObject.addChallenge.challenge);
      }

    }

  };

  $rootScope.$on('handleBroadcast', function() {
      switch (EventBus.message.substr(0, EventBus.message.lastIndexOf(':'))) {
        case "nextday":
          gameState.nextDay();
          break;
        case "showstate":
          gameState.showState();
          break;
        default :
          break;
      }
  });
  return gameState;

}]);


spentApp.factory("EventBus", function ($rootScope) {
  var EventBus = {};
  EventBus.message = '';

  EventBus.prepForBroadcast = function(msg) {
    this.message = msg;
    this.broadcastItem(msg);
  };

  EventBus.broadcastItem = function(msg) {
    console.log('EventBus message: ' + EventBus.message);
    $rootScope.$broadcast('handleBroadcast', msg );
  };

  return EventBus;
});


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

