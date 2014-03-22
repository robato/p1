var game = ( function() {
		var ChallengeRepository = require ('./challengerepository.js');
		var Player = require('./player.js');

		return {

			_daysInMonth : 30,
			_currentDay : 1, 
			_challengeRepository : null,
			_player : null,
			_initialized : false,
		
			_initGame : function() {
				this._challengeRepository = new ChallengeRepository();
			
				this._player = new Player(1000);
				console.log("initialized game.");
			} ,


			_init : function() {
				this._initGame();
				this._initialized = true;
			} ,

			getJobs: function() {

			},
			
			getPlacesToLive : function () {

			} ,

	

			decideWhatToDoWithExtraStuff : function() {
				this._player.creditAccount(10);
				console.log("extra stuff");

			},

			chooseHealthInsurance : function() {
				this._player.optInToInsurance();
				console.log("choose health insurance");
			},



			daysInMonth : function() {
				return ( this._daysInMonth );
			} ,

			endOfTheMonth : function() {
				return ( this._currentDay > this._daysInMonth );
			} ,

			getCurrentDay : function() {
				return this._currentDay;
			} ,

			onChallengeSelected : function (challenge) {

			} ,

			showState : function() {

			} ,

			start : function() {
				this._init();

			} ,

			getChallenge : function() {

				if(!this._initialized) {
					throw new Error("you must first start the game");
				}

				return ( this.endOfTheMonth() ? null : this._challengeRepository.getChallenge() );
			} ,

			optionSelected: function(option) {
				this._currentDay++;
			}

		};
	}
) ();

module.exports = game;
