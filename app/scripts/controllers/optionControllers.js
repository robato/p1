var optionControllers = angular.module('optionControllers', []);

optionControllers.controller('OptionListController', ['$scope', '$http', function($scope, $http) {
  $http.get('../docs/options.json').success(function(data) {
    $scope.options = data;
    $scope.optionOrder = 'id';
  });
}]);
