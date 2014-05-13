var eventBusService = angular.module('eventBusService', []);

eventBusService.factory("eventBusService", function ($rootScope) {
  var eventBus = {};
  eventBus.message = '';

  eventBus.prepForBroadcast = function(msg) {
    this.message = msg;
    this.broadcastItem(msg);
  };

  eventBus.broadcastItem = function(msg) {
    console.log('eventBus message: ' + eventBus.message);
    $rootScope.$broadcast('handleBroadcast', msg );
  };

  return eventBus;
});
