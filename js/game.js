function Game() {
	this._challengeRepository = new ChallengeRepository();
	this._daysInMonth = 30;
	this._currentDay = 1; 
	this._player = null;
	this._initialized = false,
	this._player = new Player(1000);
}


			
		
Game.prototype._initGame = function() {

				print("initialized game.");
			} ;


			Game.prototype._init = function() {
				this._initGame();
				this._initialized = true;
			} ;

			Game.prototype.getJobs = function() {
				print("choose job");
			} ;
			
			Game.prototype.getPlacesToLive = function () {
				print("choose place to live");
			} ;

	

			Game.prototype.decideWhatToDoWithExtraStuff = function() {
				this._player.creditAccount(10);
				print("extra stuff");

			};

			Game.prototype.chooseHealthInsurance = function() {
				this._player.optInToInsurance();
				print("choose health insurance");
			};



			Game.prototype.daysInMonth = function() {
				return ( this._daysInMonth );
			} ;

			Game.prototype.endOfTheMonth = function() {
				return ( this._currentDay > this._daysInMonth );
			} ;

			Game.prototype.getCurrentDay = function() {
				return this._currentDay;
			} ;

			Game.prototype.onChallengeSelected = function (challenge) {

			} ;

			Game.prototype.showState = function() {

			} ;

			Game.prototype.start = function() {
				this._init();

			} ;

			Game.prototype.getChallenge = function() {

				if(!this._initialized) {
					throw new Error("you must first start the game");
				}

				return ( this.endOfTheMonth() ? null : this._challengeRepository.getChallenge() );
			} ;

			Game.prototype.optionSelected = function(option) {
				this._currentDay++;
			};



