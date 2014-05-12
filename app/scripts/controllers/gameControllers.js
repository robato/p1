var gameControllers  = angular.module('gameControllers', []);

gameControllers.controller('GameController', function($scope, gameState) {
	$scope.state = gameState;

 });