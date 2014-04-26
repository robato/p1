function Game() {
	this._challengeRepository = new ChallengeRepository();
	this._optionRepository = new OptionRepository();
	this._daysInMonth = 30;
	this._currentDay = 1; 
	this._player = null;
	this._initialized = false,
	this._player = new Player(1000);
}


			
		
Game.prototype = {
	
	_initGame : function() {

		print("initialized game.");
	} ,

	_init : function() {
		this._initGame();
		this._initialized = true;
	} ,

	getJobs : function() {
		print("choose job");
	} ,
			
	getPlacesToLive : function () {
		print("choose place to live");
	} ,

	decideWhatToDoWithExtraStuff : function() {
		this._player.creditAccount(10);
		print("extra stuff");
	} ,

	chooseHealthInsurance : function() {
		this._player.optInToInsurance();
		print("choose health insurance");
	} ,

	daysInMonth : function() {
		return ( this._daysInMonth );
	} ,

	endOfTheMonth : function() {
		return ( this._currentDay > this._daysInMonth );
	} ,

	getCurrentDay : function() {
		return this._currentDay;
	} ,

	nextDay : function() {
		return ++this._currentDay;
	} ,

	onChallengeSelected : function (challenge) {
	} ,

	showState : function() {
		print(JSON.stringify(this));
	} ,

	start : function() {
		this._init();
	} ,

	getChallenge : function() {

		if(!this._initialized) {
			throw new Error("you must first start the game");
		}

		return ( this.endOfTheMonth() ? null : this._challengeRepository.getNextChallenge() );
	} ,

	optionSelected : function(option) {
		var self = this,
			optionObject = null;
		// get option
		optionObject = self._optionRepository.getOptionWithID(option['@id']);

		if(optionObject !== null) {

			if(optionObject.removeChallenge !== null ) {
				// remove challenges
				self._challengeRepository.removeChallenges(optionObject.removeChallenge.challenge);
			}

			if(optionObject.addChallenge !== null) {
				// add challenges
				self._challengeRepository.addChallenges(optionObject.addChallenge.challenge);
			}

		}

	}
};

