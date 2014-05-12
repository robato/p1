var playerControllers  = angular.module('playerControllers', []);

playerControllers.controller('PlayerController', function($scope, gameState, EventBus) {
	$scope.$watchCollection(gameState, function() {
	  $scope.state = gameState;
	});
	$scope.EventBus = EventBus;
	$scope.$on('handleBroadcast', function(message) {

	  if(EventBus.message.lastIndexOf('newplayer', 0) === 0) {
	  	var balance = parseInt(EventBus.message.substr(EventBus.message.lastIndexOf(':') + 2,EventBus.message.length));
	  	$scope.Player(balance);
	  }
	});
	$scope.currentBankBalance = gameState.currentBankBalance;


	$scope.$watch('currentBankBalance', function() {
	  if($scope.currentBankBalance > 1000) {
	    $scope.currentBankBalance = 1000;
	  } else if ($scope.currentBankBalance <= 0 || !$scope.currentBankBalance) {
	    $scope.currentBankBalance = 0;
	  }
	  $scope.currentBalanceDisplay = "$" + $scope.currentBankBalance;

	});

	$scope.Player = function (startingBalance) {
		this._account = startingBalance;
		this._salary = 0;
		this._job = "unemployed";
		this._hasInsurance = false;
		this._obligations = [];
		this._rescues = [];
		console.log("PlayerController: created player with balance of: " + startingBalance);
	}

	$scope.Player.prototype.setSalary = function() {

	};

	$scope.Player.prototype.debitAccount = function(amount) {
		this._account += amount;
		if(this._account < 0) {
			throw new Error("account overdrawn.");
		}
	};

	$scope.Player.prototype.creditAccount = function(amount) {
		this._account += amount;
	};

	$scope.Player.prototype.setJob = function() {

	};

	$scope.Player.prototype.getJob = function() {

	};

	$scope.Player.prototype.optInToInsurance = function() {
		this._hasInsurance = true;
	};

	$scope.Player.prototype.hasInsurance = function() {
		return this._hasInsurance;
	};

	$scope.Player.prototype.addObligation = function() {

	};

	$scope.Player.prototype.payOffObligation = function(obligation) {

	};

	$scope.Player.prototype.useRescue = function() {

	};

 });