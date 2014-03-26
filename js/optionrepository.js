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