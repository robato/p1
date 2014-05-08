var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('ChallengeListController', ['$scope', '$http', function($scope, $http) {
  $scope.test = function() {
  	console.log('test');
  }
  
  $http.get('../docs/challenges.json').success(function(data) {
    $scope.challenges = data;
    $scope.challengeOrder = '@id';
  });
}]);
