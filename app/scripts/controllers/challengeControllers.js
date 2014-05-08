var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('ChallengeListController', ['$scope', '$http', function($scope, $http) {
  $http.get('../docs/challenges.json').success(function(data) {
    $scope.challenges = data.challenges.challenge;
    $scope.challengeOrder = '@id';
  });
}]);
