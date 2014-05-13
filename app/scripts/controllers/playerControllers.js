var playerControllers  = angular.module('playerControllers', []);

playerControllers.controller('PlayerController', function($scope, eventBusService) {
	$scope.currentBalanceDisplay = "$" + $scope.state._currentBankBalance;
	$scope.eventBus = eventBusService;
	$scope.$on('handleBroadcast', function(message) {
	  if($scope.eventBus.message.lastIndexOf('newplayer', 0) === 0) {
	  	var balance = parseInt(eventBus.message.substr(eventBus.message.lastIndexOf(':') + 2,eventBus.message.length));
	  	$scope.Player(balance);
	  }
	});

	$scope.$watch(function(){
	  return $scope.state._currentBankBalance;
	}, function (newBalance) {
	  $scope.currentBalanceDisplay = "$" + newBalance;
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
		$scope.eventBus.prepForBroadcast('debitaccount: ' + amount);
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