
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

