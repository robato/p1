var userInputDirectives = angular.module('userInputDirectives', []);

userInputDirectives.directive('onKeyup', function() {
	return {
	  restrict: 'A',
	  scope: {
	    func: '&onKeyup'
	  },
	  link: function( scope, elem, attrs ) {
	    elem.bind('keyup', scope.func);
	    console.log(attrs);
	  }
	};
 });