var optionControllers = angular.module('optionControllers', []);

optionControllers.controller('OptionController', ['$scope', '$http', function($scope, $http, gameStateService) {
	$scope.state = gameStateService;

	$scope.OptionRepository = function() {
		$http.get('../docs/options.json').success(function(data) {
    		$scope.options = data.options.option;
  		});
		$scope.optionsSize = $scope.options.length;
	}

	$scope.OptionRepository.prototype = {
		getOptionWithID : function(id) {
			var self = this,
				option = null,
				i = 0;

			for(; i < $scope.optionsSize && ( option === null); i++) {
				if( id == $scope.options[i]['@id']) {
					option = $scope.options[i];
				}
			}

			return ( option );
		}

	};

}]);