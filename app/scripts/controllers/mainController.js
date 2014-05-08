var mainController  = angular.module('mainController', ['matchmedia-ng']);

mainController.controller('MainController', function($scope, $window, $document, $timeout, DayDataService, ScreenUpdateService, matchmedia) {
  $scope.jobStrikes = {
    'strikeOne': 'false',
    'strikeTwo': 'false',
    'strikeThree': 'false'
  };
  $scope.currentDayIndex = 0;
  $scope.currentDayIndexInt = parseInt($scope.currentDayIndex);
  $scope.isSoundOn = false;
  $scope.debugMode = true;
  var allDayData = {};

  DayDataService.async().then(function(d) {
    $scope.firstDayData = d[$scope.currentDayIndexInt];
    $scope.allDayData = d;
    $scope.currentGameDay = $scope.firstDayData.dayDisplay;
  });

  $scope.phoneMenuVisible = false;
  $scope.daysListTop = 25;
  $scope.readoutMarkerXPositionFromReadoutTop = 37;
  $scope.dayOneXPosition = 12;
  $scope.readoutTopPositionBase = 0 + $scope.daysListTop - $scope.readoutMarkerXPositionFromReadoutTop + $scope.dayOneXPosition ;
  $scope.currentBankBalance = 1000;


  $scope.$watch('currentBankBalance', function() {
      if($scope.currentBankBalance > 1000) {
        $scope.currentBankBalance = 1000;
      }
      if ($scope.currentBankBalance <= 0 || !$scope.currentBankBalance) {
        $scope.currentBankBalance = 0;
      }
      $scope.currentBalanceDisplay = "$" + $scope.currentBankBalance;

  });
  $scope.$watch('currentDayIndex', function() {
      if($scope.currentDayIndex) {
        if ($scope.currentDayIndexInt > 30 || !$scope.currentDayIndexInt) {
          $scope.currentDayIndexInt = 30;
        }
        if ($scope.currentDayIndexInt <= 0 || !$scope.currentDayIndexInt) {
          $scope.currentDayIndexInt = 0;
        }
        

      }
      if ($scope.allDayData) {
      $scope.currentGameDay = $scope.allDayData[parseInt($scope.currentDayIndex)].dayDisplay;
      } else {
        $scope.currentGameDay = "01";
      }
      $timeout($scope.setReadoutXPositions);
  });

  $scope.viewportHeight = $window.innerHeight;
  $scope.viewportWidth = $window.innerWidth;

  $scope.$on('handleBroadcast', function(message) {
      $window.alert('message passed: ' + $scope.message);
  });

  var unsub = {};
  unsub['print'] = matchmedia.onPrint(function(mediaQueryList){
    $scope.isPrint = mediaQueryList.matches;
  }, $scope);
  unsub['screen'] = matchmedia.onScreen(function(mediaQueryList){
    $scope.isScreen = mediaQueryList.matches;
  }, $scope);
  unsub['phone'] = matchmedia.onPhone(function(mediaQueryList){
    $scope.isPhone = mediaQueryList.matches;
  });
  unsub['tablet'] = matchmedia.onTablet( function(mediaQueryList){
    $scope.isTablet = mediaQueryList.matches;
  });
  unsub['desktop'] = matchmedia.onDesktop( function(mediaQueryList){
    $scope.isDesktop = mediaQueryList.matches;
  });
  unsub['portrait'] = matchmedia.onPortrait(function(mediaQueryList){
    $scope.isPortrait = mediaQueryList.matches;
  });
  unsub['landscape'] = matchmedia.onLandscape(function(mediaQueryList){
    $scope.isLandscape = mediaQueryList.matches;
  });

  angular.element($window).bind('resize', function(e) {
      $scope.viewportHeight = $window.innerHeight;
      $scope.viewportWidth = $window.innerWidth;
      $timeout($scope.setReadoutXPositions);
  });
  $document.bind('keypress', function(event) {
      if(event.which == 100) {
        $scope.debugMode = true;
        $scope.$apply();
      }
  })

  $scope.updateDayPositions = function(p, id) {
    $scope.allDayData[id].positionX = p;
  }

  $scope.setReadoutXPositions = function() {
    var dayNumberReadout = angular.element(document.getElementById('day-number-readout'));
    var bankBalanceReadout = angular.element(document.getElementById('bank-balance-readout'));
    var pxDown = 0;
    if($scope.allDayData) {
      pxDown = $scope.allDayData[$scope.currentDayIndex].positionX;
    } else {
      pxDown = 0;
    }
    console.log(pxDown);
    dayNumberReadout.css('top', pxDown + 'px');
    bankBalanceReadout.css('top', pxDown + 'px');
  }

  $scope.toggleSound = function () {
      if ($scope.isSoundOn) {
        $scope.isSoundOn = false;
      } else {
        $scope.isSoundOn = true;
      }
      $scope.$apply();
  }
  $scope.togglePhoneMenu = function (obj) {
    var t = obj.target.attributes.data.value;
      if (t == 'menu-on-icon') {
        $scope.openPhoneMenu();
      } else {
        $scope.closePhoneMenu();
      }
  }
  $scope.openPhoneMenu = function () {
      $scope.phoneMenuVisible = true;
      var menu = angular.element(document.getElementById('phone-menu-div'));
      menu.addClass('display-visible');
      menu.addClass('pure-menu-open');
      menu.removeClass('display-hidden');
      menu.css('background', 'black');
      menu.css('width', '150px');     
      menu.css('top', '-200px');
      menu.css('left', '0px');  
  }
  $scope.closePhoneMenu = function () {
      $scope.phoneMenuVisible = false;
      var menu = angular.element(document.getElementById('phone-menu-div'));
      menu.addClass('display-hidden');
      menu.removeClass('pure-menu-open');
      menu.removeClass('display-visible');
      menu.css('background', '');
      menu.css('width', '');     
      menu.css('top', '');
      menu.css('left', '');  
  }

  mainController.$inject = ['$scope', 'ScreenUpdateService'];
});
