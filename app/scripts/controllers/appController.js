var appController  = angular.module('AppController', []);

appController.controller('AppController', function ($scope, $window) {
    $scope.keyup = function(keyEvent) {
        console.log('keyup', keyEvent);
    };
});