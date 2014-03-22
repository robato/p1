
function Challenge(state) {
	var self = this;
	self["@id"] = state["@id"];
	self.copy = state.copy;
	self.maxAmount = state.maxAmount;
	self.minAmount = state.minAmount;
	self.options = state.options.option;
	self.title = state.title;

	console.log("created Challenge");

}


Challenge.prototype.getOptions = function () {
	var self = this;
	console.log("return options");
	return self.options;
};

module.exports = Challenge;