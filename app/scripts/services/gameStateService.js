var gameStateModule = angular.module('gameStateService', []);

gameStateModule.factory('gameStateService',  ['$rootScope', 'eventBusService', 'DayDataService',  function ($rootScope, eventBusService, DayDataService) {

  var gameState = {};
  var eventBus = eventBusService;
  gameState._allDayData = DayDataService;

  gameState._jobStrikes = {
    'strikeOne': 'false',
    'strikeTwo': 'false',
    'strikeThree': 'false'
  };
  gameState._currentDayIndex = 0;
  gameState._currentDayIndexInt = 0;

  $rootScope.$watch(function(){
      return gameState._currentDayIndex;
  }, function(newValue) {
    gameState._currentDayIndexInt = parseInt(newValue);
    gameState._currentGameDay = gameState._allDayData[gameState._currentDayIndexInt].dayDisplay;
  });

  gameState._isSoundOn = true;
  gameState._debugMode = false;
  gameState._daysInMonth = 30;
  gameState._currentBankBalance = 1000;

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
        ++gameState._currentDayIndex;
  };
  gameState.prevDay = function() {
        --gameState._currentDayIndex;
  };
  gameState.setBalance = function(amount) {
        gameState._currentBankBalance = +amount;
  };
  gameState.debitAccount = function(amount) {
        gameState._currentBankBalance = +gameState._currentBankBalance - +amount;
  };
  gameState.creditAccount = function(amount) {
        gameState._currentBankBalance = +gameState._currentBankBalance + +amount;
  };
  gameState.toggleDebug = function(state) {
    if (state === 'on') {
      gameState._debugMode = true;
    } else if (state = 'off') {
      gameState._debugMode = false;
    } 
  };
  gameState.onChallengeSelected = function (challenge) {
  };
  gameState.showState = function() {
        console.log(JSON.stringify(gameState));
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
      var arg = eventBus.message.substr(eventBus.message.lastIndexOf(':') + 2,eventBus.message.length);
      switch (eventBus.message.substr(0, eventBus.message.lastIndexOf(':'))) {
        case "nextday":
          gameState.nextDay();
          break;
        case "prevday":
          gameState.prevDay();
          break;
        case "showstate":
          gameState.showState();
          break;
        case "setbalance":
          gameState.setBalance(arg);
          break;
        case "debitaccount":
          gameState.debitAccount(arg);
          break;
        case "creditaccount":
          gameState.creditAccount(arg);
          break;
        case "debug":
          gameState.toggleDebug(arg);
          break;
        default :
          break;
      }
  });
  return gameState;

}]);