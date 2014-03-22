var game = require('./game.js');
var challenge = null;
var options = null;

game.start();
game.getJobs();
game.getPlacesToLive();
game.decideWhatToDoWithExtraStuff();
game.chooseHealthInsurance();

while(! game.endOfTheMonth() ) {
					
	challenge = game.getChallenge();
	console.log(challenge.copy);
	options = challenge.getOptions();

	// display options
	console.dir(options);
	// select option
	console.log(game.getCurrentDay());
	game.optionSelected({});
}