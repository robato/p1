var mainController  = angular.module('mainController', ['matchmedia-ng']);

mainController.controller('MainController', function($scope, $window, $document, DayDataService, matchmedia) {
  $scope.jobStrikes = {
    'strikeOne': 'false',
    'strikeTwo': 'false',
    'strikeThree': 'false'
  };

  $scope.currentDayIndex = 0;
  $scope.isSoundOn = false;
  $scope.debugMode = true;
  var allDayData = {};

  DayDataService.async().then(function(d) {
    $scope.firstDayData = d[$scope.currentDayIndex];
    $scope.allDayData = d;
    $scope.currentGameDay = $scope.firstDayData.dayDisplay;
  });

  $scope.phoneMenuVisible = false;
  $scope.readoutTopPosition = 0;
  $scope.currentBankBalance = 1000;

  $scope.$watch('currentBankBalance', function() {
      $scope.currentBalanceDisplay = "$" + $scope.currentBankBalance;
  });
  $scope.$watch('currentDayIndex', function() {
      $scope.currentGameDay = $scope.allDayData[$scope.currentDayIndex].dayDisplay;
  });

  $scope.viewportHeight = $window.innerHeight;
  $scope.viewportWidth = $window.innerWidth;


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
  });
  $scope.keyup = function(keyEvent) {
      console.log('keyup', keyEvent);
  };
  $scope.toggleSound = function () {
      if ($scope.isSoundOn) {
        $scope.isSoundOn = false;
      } else {
        $scope.isSoundOn = true;
      }
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
});
