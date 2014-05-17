var canvasControllers  = angular.module('canvasControllers', []);

canvasControllers.controller('CanvasController', function ($scope, $window) {

    $scope.drawVerticalMenuBarBackgrounds = function  () {
		var canvas = document.getElementById('menuCanvas');
		var context = canvas.getContext('2d');
		var width = 75;
		if ($scope.$parent.isPhone && $scope.$parent.isPortrait){
			width = 50;
		}	
		context.beginPath();
		context.moveTo(0,0)
		context.lineTo(width,0);
		context.lineTo(width, $window.innerHeight - 35);
		context.lineTo(0, $window.innerHeight - 35);
		context.fillStyle = 'rgba(100,100,100,.25)';
		context.fill();
		context.beginPath();
		context.moveTo($window.innerWidth - width, 0)
		context.lineTo($window.innerWidth, 0);
		context.lineTo($window.innerWidth, $window.innerHeight - 35);
		context.lineTo($window.innerWidth - width, $window.innerHeight - 35);
		context.fillStyle = 'rgba(100,100,100,.25)';
		context.fill();
    }

    $scope.drawRings = function () {
    	var ringStroke = 1;
		if ($scope.$parent.isPhone){
			ringStroke = 2;
		}
		var canvas = document.getElementById('ringCanvas');
		var context = canvas.getContext('2d');
		var centerX = $window.innerWidth / 2;
		var centerY = $window.innerHeight / 2;
		var radii = [ 4, 8, 10, 15, 20, 30, 40, 50, 75, 110, 150, 190, 250, 300, 400, 520, 700 ];
		angular.forEach(radii, function(radius){
		  context.beginPath();
		  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		  context.lineWidth = ringStroke;
		  context.strokeStyle = 'rgba(100,100,100,.25)';
		  context.stroke();
		});
    }

    $scope.clearCanvas = function (context, canvas)  {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  var w = canvas.width;
	  canvas.width = 1;
	  canvas.width = w;
	}
	$scope.maximizeCanvasSize = function (context, canvas) {
		canvas.width  = $window.innerWidth;
		canvas.height = $window.innerHeight;
		context.clearRect( 0, 0, context.canvas.width, context.canvas.height);
	}

	$scope.getWidth = function() {
        return $(window).innerWidth;
    };
	$scope.getHeight = function() {
        return $(window).innerHeight;
    };

    	$scope.$watch($scope.getWidth, function(newValue, oldValue) {
	$scope.window_width = newValue;
    });

    $scope.$watch($scope.getHeight, function(newValue, oldValue) {
        $scope.window_height = newValue;
    });

    window.onresize = function(){
		var rings = document.getElementById('ringCanvas');
      	var ringsContext = rings.getContext('2d');
		var menus = document.getElementById('menuCanvas');
      	var menusContext = menus.getContext('2d');
       	$scope.maximizeCanvasSize(ringsContext, rings)
		$scope.maximizeCanvasSize(menusContext, menuCanvas);
		$scope.clearCanvas(ringsContext, rings);
		$scope.clearCanvas(menusContext, menus);
    	$scope.drawRings();
	    $scope.drawVerticalMenuBarBackgrounds();
        $scope.$apply();
    }
	var rings = document.getElementById('ringCanvas');
  	var ringsContext = rings.getContext('2d');
	var menus = document.getElementById('menuCanvas');
  	var menusContext = menus.getContext('2d');
   	$scope.maximizeCanvasSize(ringsContext, rings)
	$scope.maximizeCanvasSize(menusContext, menuCanvas);
    $scope.drawRings();
    $scope.drawVerticalMenuBarBackgrounds();



});