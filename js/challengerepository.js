function ChallengeRepository() {
	var self = this,
		data = null;

	self._currentChallengeIndex = 0;
	data = read('../docs/challenges.json');
	data = JSON.parse(data);
	self._challenges = data.challenges.challenge;
	self._challengesSize = data.challenges.challenge.length;

	//console.dir(data);
	//console.log("created ChallengeRepository");
}

ChallengeRepository.prototype = {
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


