
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
	self.options = ( state.options.option instanceof Array ? state.options.option : [state.options.option] );
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



function OptionRepository() {
	var self = this,
		data = null;

	data = read('../docs/options.json');
	data = JSON.parse(data);
	self._options = data.options.option;
	self._optionsSize = self._options.length;
}

OptionRepository.prototype = {
	getOptionWithID : function(id) {
		var self = this,
			option = null,
			i = 0;

		for(; i < self._optionsSize && ( option === null); i++) {
			if( id == self._options[i]['@id']) {
				option = self._options[i];
			}
		}

		return ( option );
	}

};
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

		this._currentDay++;
	}
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
				o = null;
				choice = readline();
				switch(choice) {
					case 'state':
					case 's' :
						game.showState();
						break;
					default:
						o = optionsObject[choice];
						break;
				}
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
