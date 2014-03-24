
function Player(startingBalance) {
	this._account = startingBalance;
	this._salary = 0;
	this._job = "unemployed";
	this._hasInsurance = false;
	this._obligations = [];
	this._rescues = [];
	print("created player");
 }




Player.prototype.setSalary = function() {

};

Player.prototype.debitAccount = function(amount) {
	this._account += amount;
	if(this._account < 0) {
		throw new Error("account overdrawn.");
	}
};

Player.prototype.creditAccount = function(amount) {
	this._account += amount;
};

Player.prototype.setJob = function() {

};

Player.prototype.getJob = function() {

};

Player.prototype.optInToInsurance = function() {
	this._hasInsurance = true;
};

Player.prototype.hasInsurance = function() {
	return this._hasInsurance;
};

Player.prototype.addObligation = function() {

};

Player.prototype.payOffObligation = function(obligation) {

};

Player.prototype.useRescue = function() {

};



function Challenge(state) {
	var self = this;
	self["@id"] = state["@id"];
	self.copy = state.copy;
	self.maxAmount = state.maxAmount;
	self.minAmount = state.minAmount;
	self.options = state.options.option;
	self.title = state.title;

	//console.log("created Challenge");

}


Challenge.prototype.getOptions = function () {
	var self = this;
	//console.log("return options");
	return self.options;
};


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




var challenge = null;
var options = null;
var option = null;
var game = new Game();

var optionHandler = ( function() {
	
	return {
		_options : null,
		setOptions : function(options) {
			this._options = options;
		},



		selectFromOptions : function() {
			var self = this,
				i = 0, 
				optionsLength = this._options.length,
				o = null
				choice = null,
				optionsObject = {};
				
			for(; i < optionsLength; i++) {
				o = this._options[i];
				print(o['@id'] + ':' + o['@title']);
				optionsObject[o['@id']] = o;
			}

			do {
				choice = readline();
				o = optionsObject[choice];
			} while ( o == null );

			return o;
		} ,

	};
}()) ;


game.start();
game.getJobs();
game.getPlacesToLive();
game.decideWhatToDoWithExtraStuff();
game.chooseHealthInsurance();


while(! game.endOfTheMonth() ) {
		
	challenge = game.getChallenge();
	print(challenge.copy);
	optionHandler.setOptions(challenge.getOptions());

	// display options
	option = optionHandler.selectFromOptions();

	print('you chose => ' + option['@title']);
	// select option
	

	//console.log(game.getCurrentDayf());
	game.optionSelected(option);
}
