var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('ChallengeController', ['$scope', '$http', '$window', function($scope, $http, $window, eventBusService) {
	$scope.eventBus = eventBusService;
	$window.alert('challngecontroller');
	
	$scope.Challenge = function(state) {
		var self = this;
		self["@id"] = state["@id"];
		self.copy = state.copy;
		self.maxAmount = state.maxAmount;
		self.minAmount = state.minAmount;
		self.options = ( state.options.option instanceof Array ? state.options.option : [state.options.option] );
		self.title = state.title;

		//console.log("created Challenge");

	}


	$scope.Challenge.prototype.getOptions = function () {
		var self = this;
		//console.log("return options");
		return self.options;
	};


	$scope.ChallengeRepository = function () {
		var self = this,
			data = null;

		self._currentChallengeIndex = 0;
		$http.get('../docs/challenges.json').success(function(data) {
    		$scope.challenges = data.challenges.challenge;
  		});
		$scope.challengesSize = $scope.challenges.length;
	}


	$scope.ChallengeRepository.prototype = {
		getNextChallenge : function() {
			var self = this,
			challenge = null;

			while ( challenge === null && ( self._currentChallengeIndex < self._challengesSize  ) ) {
				challenge = self._challenges[self._currentChallengeIndex++];
				if( challenge.hasOwnProperty('inactive') ) {
					challenge = null;
				}
			} 


			return ( challenge !== null ? new Challenge(challenge) : null );
		},

		getChallengeWithID : function (id) {
			var self = this,
				challenge = null,
				i = 0;

			for(; i < self._challengesSize && ( challenge === null); i++) {
				if( id == self._challenges[i]['@id']) {
					challenge = self._challenges[i];
				}
			}

			return ( challenge );
		},

		getChallengeIndex : function (id) {
			var self = this,
				challenge = null,
				i = 0;

			for(; i < self._challengesSize && ( id === self._challenges[i]['@id']); i++) ;

			return ( i );
		},

		addChallenges : function(challenges) {
			var self = this,
				i = 0,
				challengesSize = challenges.length,
				challenge = null;	

			for(; i < challengesSize; i++) {
				challenge = self.getChallengeWithID(challenges[i]['@id']);
				// add active field
				if(challenge !== null) {
					delete challenge['inactive'];
				}
			}

		},

		removeChallenges : function(challenges) {
			var self = this,
				i = 0,
				challengesSize = challenges.length,
				challenge = null;	

			for(; i < challengesSize; i++) {

				challenge = self.getChallengeWithID(challenges[i]['@id']);

				//print(JSON.stringify(challenges[i]));

				// add active field
				if(challenge !== null ) {
					challenge['inactive'] = true;
				}
				//print(JSON.stringify(challenge));
			}
		}
	};

}]);