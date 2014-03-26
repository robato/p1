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
