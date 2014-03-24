function ChallengeRepository() {
	var self = this,
		data = null;

	self._currentChallengeIndex = 0;
	data = read('../docs/challenges.json');
	data = JSON.parse(data);
	self._challenges = data.challenges.challenge;
	//console.dir(data);
	//console.log("created ChallengeRepository");
}

ChallengeRepository.prototype.getChallenge = function() {
	var self = this;
	//console.log("get challenge");
	return new Challenge(self._challenges[self._currentChallengeIndex++]);
};

ChallengeRepository.prototype.addChallenges = function(challenges) {
	//console.log("activating challenges");
};

ChallengeRepository.prototype.removeChallenges = function(challenges) {
	//console.log("deactivating challenges");
};

