var layoutManagerDirectives = angular.module('layoutManagerDirectives', ['matchmedia-ng']);

layoutManagerDirectives.directive('directivecontrolreference', [ '$window', function factory($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div style="display: none;"></div>',
    scope: {
      directiveControl: '=',
      isPhone: '@',
      isTablet: '@',
      isDesktop: '@',
      isPortrait: '@',
      isLandscape: '@',
      gameState: '@'
    },
    link : function (scope, element, attrs) {
      var viewport ;
      var viewportHeight;
      var viewportWidth;
      var viewportOffsetWidth;
      var viewportOffsetHeight;
      var menuBarElement;
      var menuItemsElements;
      var debugPanelElement;
      var daysListContainerElement;
      var dayDisplayDivElements;
      var spentBackgroundElement;
      var spentBackgroundHeight;
      var spentBackgroundWidth;
      var dayNumberReadoutElement;
      var bankBalanceReadoutElement;
      var menuBarElement;
      var exitControlElement;
      var xImageElement;
      var debugPanelElementHeight;
      var debugPanelElementWidth;
      var controlsAndBadgesElement;
      var challengesAndOptionsElement;
      var spentLogoImageElement;

      var DOMObjectHandles = function() {
        viewportOffsetWidth = $window.offsetWidth;
        viewportOffsetHeight = $window.offsetHeight;
        viewportHeight = $window.innerHeight;
        viewportWidth = $window.innerWidth;
        menuBarElement = angular.element(document.getElementById('menu-bar'));
        menuItemsElements = menuBarElement.children().find('li');          
        debugPanelElement = angular.element(document.getElementById('debug-panel'));
        daysListContainerElement = angular.element(document.getElementById('days-list-container'));
        dayDisplayDivElements = daysListContainerElement.children().find('div');
        spentBackgroundElement = angular.element(document.getElementById('spent-background'));
        spentBackgroundHeight = spentBackgroundElement[0].offsetHeight;
        debugPanelElementWidth = debugPanelElement[0].offsetWidth;
        debugPanelElementHeight = debugPanelElement[0].offsetHeight;
        spentBackgroundWidth = spentBackgroundElement[0].offsetWidth;
        dayNumberReadoutElement = angular.element(document.getElementById('day-number-readout')); 
        bankBalanceReadoutElement = angular.element(document.getElementById('bank-balance-readout'));
        menuBarElement = angular.element(document.getElementById('menu-bar'));
        exitControlElement = angular.element(document.getElementById('exit-control'));
        xImageElement = angular.element(document.getElementById('exit-control-image'));
        debugPanelElementHeight = debugPanelElement[0].offsetHeight;
        debugPanelElementWidth = debugPanelElement[0].offsetWidth;
        controlsAndBadgesElement = angular.element(document.getElementById('controls-and-badges'));
        challengesAndOptionsElement = angular.element(document.getElementById('challenge-options-results'));
        spentLogoImageElement = angular.element(document.getElementById('spent-logo-image'));
        spentLogoInitialElement = angular.element(document.getElementById('spent-logo-initial'));
        sideBordersTranslucent = angular.element(document.getElementById('side-borders-translucent'));
      }

      scope.thisDirectiveControl = scope.directiveControl || {};

      scope.thisDirectiveControl.setReadoutXPositions = function(currentDay) {
        var currentGameDayElement = angular.element(document.getElementById('day_' + currentDay));
        var topValue;
        if(currentDay > 0) {
          topValue = currentGameDayElement[0].offsetTop;
          dayNumberReadoutElement.css('top', topValue + 'px');
          bankBalanceReadoutElement.css('top', topValue + 'px');
        } else if (currentDay == 0) {
          dayNumberReadoutElement.css('top', '0px');
          bankBalanceReadoutElement.css('top', '0px');
        }
      }
      scope.thisDirectiveControl.enableControls = function () {
        DOMObjectHandles();
        controlsAndBadgesElement.removeClass('display-hidden');
        controlsAndBadgesElement.addClass('display-visible');
        sideBordersTranslucent.removeClass('display-hidden');
        sideBordersTranslucent.addClass('display-visible');
      }
      scope.thisDirectiveControl.disableControls = function () {
        DOMObjectHandles();
        controlsAndBadgesElement.addClass('display-hidden');
        controlsAndBadgesElement.removeClass('display-visible');
        sideBordersTranslucent.addClass('display-hidden');
        sideBordersTranslucent.removeClass('display-visible');
      }

      scope.thisDirectiveControl.hideChallengesOptions = function () {
        DOMObjectHandles();
        challengesAndOptionsElement.removeClass('display-visible');
        challengesAndOptionsElement.addClass('display-hidden');
      }
      scope.thisDirectiveControl.layoutChallengesAndOptions = function () {
        DOMObjectHandles();
        var vpH = viewportHeight;
        var vpW = viewportWidth;
        challengesAndOptionsElement.css('top', (vpH/2) - (challengesAndOptionsElement[0].clientHeight/2) + 'px');
        challengesAndOptionsElement.css('left', (vpW/2) - (challengesAndOptionsElement[0].clientWidth/2) + 'px');
      }

      scope.thisDirectiveControl.screenLayoutHandler = function() {
        DOMObjectHandles();
        var vpH = viewportHeight;
        var vpW = viewportWidth;
        for (i=0; i<=30; i++) {
          var dayDivElement = angular.element(document.getElementById('day_' + i));
          var dayDivTop = $(dayDivElement).offset();
          dayDivElement.css('line-height', (vpH/40  + 'px'));
        }
        spentBackgroundElement.css('top', (vpH/2) - (spentBackgroundHeight/2) + 'px');
        spentBackgroundElement.css('left',(vpW/2) - (spentBackgroundWidth/2) +  'px');
        debugPanelElement.css('top', (vpH/2) - (debugPanelElementHeight/2) + 'px');
        debugPanelElement.css('left', (vpW/2) - (debugPanelElementWidth/2) + 'px');  
        if(scope.directiveControl.debugMode) { 
          debugPanelElement.addClass('display-visible'); 
          debugPanelElement.removeClass('display-hidden');    
        } else {
          debugPanelElement.addClass('display-hidden');
          debugPanelElement.removeClass('display-visible');
        } 
        if(scope.$parent.isPhone) {
          dayNumberReadoutElement.css('left', (vpW) - 100 + 'px');  
        } else {
          dayNumberReadoutElement.css('left', (vpW) - 180 + 'px');  
        } 

        
        if(scope.$parent.isPhone) {
          bankBalanceReadoutElement.css('left', '40px');  
        } else {
          bankBalanceReadoutElement.css('left', '82px'); 
        } 

        menuBarElement.css('top', vpH - 36 + 'px');

        if(scope.$parent.isPhone) {
          spentLogoImageElement.css('top', vpH - 28 + 'px');
          spentLogoImageElement.css('left', (vpW/2) - 82 + 'px'); 
        } else {
          spentLogoImageElement.css('top', vpH - 82 + 'px');
          spentLogoImageElement.css('left', (vpW/2) - 127 + 'px');      
        }
        scope.$emit('onScreenLayoutComplete', element, attrs);
      }
      angular.element($window).bind('resize', scope.thisDirectiveControl.screenLayoutHandler);
    }
  }
}]);

layoutManagerDirectives.directive('dayPositionInit', ['$window', '$timeout', function($window, $timeout) {
  return {
    link : function(scope, element, attrs) {
      if (scope.$last) $timeout(function(){
          scope.$emit('onDayListComplete', element, attrs);
      }, 0);
    }
  }
}]);

layoutManagerDirectives.directive('challengePanelInit', ['$window','$timeout',  function($window, $timeout) {
  return {
    link : function(scope, element, attrs) {
      $timeout(function(){
          scope.$emit('onChallengesAndOptionsComplete', element, attrs);
      }, 0);
    }
  }
}]);

layoutManagerDirectives.directive('menuBottomEdge', ['$window', function($window) {
    return {
      link : function(scope, element, attrs) {
        angular.element($window).bind('resize', function(e) {
          var menuBarElement = angular.element(document.getElementById('menu-bar'));
          if (scope.isPhone) {
          } else {
            menuBarElement.css('top', $window.innerHeight - 36 + 'px');
          }
        });
      }
    }
}]);


layoutManagerDirectives.directive('distributeDaysVertically', ['$window', function($window) {
  return {

    priority: 0,
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        var containerElement = angular.element(document.getElementById('days-list-container'));
        var dayDivTop = element[0].offsetTop;
        if ($window.innerHeight < 645) {
          element.css('line-height', ($window.innerHeight)/42  + 'px');
        } else {
          element.css('line-height', ($window.innerHeight)/42  + 'px');
        }
      });
    }
  }
}]);




layoutManagerDirectives.directive('spentLogoPosition', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if (scope.isPhone) {
          element.css('top', $window.innerHeight - 28 + 'px');
          element.css('left', ($window.innerWidth/2) - 82 + 'px');       
        } else {
          element.css('top', $window.innerHeight - 82 + 'px');
          element.css('left', ($window.innerWidth/2) - 127 + 'px');      
        }  
      });    
    }
  }
}]);


layoutManagerDirectives.directive('dayListRightEdge', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if(scope.isPhone) {
          element.css('left', ($window.innerWidth) - 55 + 'px');
        } else {
          element.css('left', ($window.innerWidth) - 70 + 'px');
        }
      });
      if(scope.isPhone) {
        element.css('left', ($window.innerWidth) - 55 + 'px');
      } else {
        element.css('left', ($window.innerWidth) - 70 + 'px');
      }
    }
  }
}]);


layoutManagerDirectives.directive('dayListControl', ['$window', function($window) {
  return {

    priority: 0,
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        element.css('height', ($window.innerHeight - 200)  + 'px');
      });
      element.css('height', ($window.innerHeight - 200)  + 'px');  
    }
  }
}]);

layoutManagerDirectives.directive('dayNumberReadout', ['$window', function($window) {
    return {
      link : function(scope, element, attrs) {
        angular.element($window).bind('resize', function(e) {
          if(scope.isPhone) {
            element.css('left', ($window.innerWidth) - 100 + 'px');  
          } else {
            element.css('left', ($window.innerWidth) - 180 + 'px');  
          }  
          scope.$emit('onDayListComplete', element, attrs);
        }); 
        angular.element(window).bind('load', function() {
          if(scope.isPhone) {
              element.css('left', ($window.innerWidth) - 100 + 'px');     
          } else {
              element.css('left', ($window.innerWidth) - 180 + 'px');   
          }  
        });            
      }
    }
}]);



layoutManagerDirectives.directive('mainPanelRowMaximizeHeight', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        element.css('height', $window.innerHeight + 'px');
      });
      
      element.css('height', $window.innerHeight + 'px');
    }
  }
}]);


layoutManagerDirectives.directive('canYouMakeItLabelPosition', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if (scope.isPhone || scope.isTablet) {
        } else {
          element.css('top', $window.innerHeight - 87 + 'px');
          element.css('left', ($window.innerWidth) - 196 + 'px');
        }

      });
        if (scope.isPhone || scope.isTablet) {
        } else {
          element.css('top', $window.innerHeight - 87 + 'px');
          element.css('left', ($window.innerWidth) - 196 + 'px');
        }
    }
  }
}]);

layoutManagerDirectives.directive('dayOneBadgePosition', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if (scope.isDesktop && $window.innerHeight > 610) {
          element.css('top', $window.innerHeight - 90 + 'px');
          element.css('left', ($window.innerWidth) - 60 + 'px');
        }
      });
      if (scope.isDesktop && $window.innerHeight > 585) {
        element.css('top', $window.innerHeight - 90 + 'px');
        element.css('left', ($window.innerWidth) - 60 + 'px');
      }
    }
  }
}]);

layoutManagerDirectives.directive('phoneMenuIconPosition', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if(scope.isPhone) {
          element.css('top', $window.innerHeight - 32 + 'px');
          element.css('left', 9 + 'px');      
        } 
      });
      if(scope.isPhone) {
        element.css('top', $window.innerHeight - 32 + 'px');
        element.css('left', 9 + 'px');     
      }    
    }
  }
}]);

layoutManagerDirectives.directive('purePhoneMenu', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if(scope.isPhone) { 
          element.addClass('pure-menu'); 
          element.removeClass('collapse'); 
          element.removeClass('navbar-collapse');
          element.addClass('display-hidden');
          element.removeClass('display-visible'); 
          // hack
          element.css('background', 'black');
          element.css('width', '150px');
          element.css('top', '-200px');
          element.css('left', '0px');    
        } else {
          element.removeClass('pure-menu'); 
          element.removeClass('pure-menu-open');
          element.removeClass('phone-menu-div');
          element.css('background', '');
          element.css('width', '');
          element.css('top', '');
          element.css('left', ''); 
          element.addClass('collapse'); 
          element.addClass('navbar-collapse');
          element.addClass('display-hidden');
          element.removeClass('display-visible');
        }  
      });
      if(scope.isPhone) { 
        element.addClass('pure-menu'); 
        element.addClass('pure-menu-open');
        element.removeClass('collapse'); 
        element.removeClass('navbar-collapse');
        element.addClass('display-hidden');
        element.removeClass('display-visible'); 
        // hack
        element.css('background', 'black');
        element.css('width', '150px');
        element.css('top', '-200px');
        element.css('left', '0px');  
      } else {
        element.removeClass('pure-menu'); 
        element.removeClass('pure-menu-open');
        element.removeClass('phone-menu-div');
        element.css('background', '');
        element.css('width', '');     
        element.css('top', '');
        element.css('left', '');   
        element.addClass('collapse'); 
        element.addClass('navbar-collapse');
        element.addClass('display-hidden');
        element.removeClass('display-visible');
      }      
    }
  }
}]);


layoutManagerDirectives.directive('warnNoPhoneLandscape', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
 
      angular.element($window).bind('resize', function(e) {
        if(scope.isPhone && scope.isLandscape) { 
          var bgHeight = element[0].clientHeight;
          var bgWidth = element[0].clientWidth;
          var top = (($window.innerHeight/2) - (bgHeight/2));
          var left = (($window.innerWidth/2) - (bgWidth/2));
          element.css('top',  top + 'px');
          element.css('left', left +  'px');        
        }   
      });
      angular.element(window).bind('load', function() {
        if(scope.isPhone && scope.isLandscape) {
          var bgHeight = element[0].clientHeight;
          var bgWidth = element[0].clientWidth;
          var top = (($window.innerHeight/2) - (bgHeight/2));
          var left = (($window.innerWidth/2) - (bgWidth/2));
          element.css('top',  top + 'px');
          element.css('left', left +  'px');    
        }     
      }); 
    }
  }
}]);


layoutManagerDirectives.directive('soundControlPosition', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          if(scope.isPhone) {
            element.css('top', ($window.innerHeight) - 72 + 'px');
            element.css('left', '6px');  
            } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', ($window.innerHeight) - 69 + 'px');
              element.css('left', '20px'); 
            } else {
            element.css('top', ($window.innerHeight) - 88 + 'px');
            element.css('left', '20px');
          }  
        });
        angular.element($window).bind('load', function(e) {
          if(scope.isPhone) {
              element.css('top', ($window.innerHeight) - 72 + 'px');
              element.css('left', '6px');   
              } else if (scope.isTablet && scope.isLandscape) {
                element.css('top', ($window.innerHeight) - 69 + 'px');
                element.css('left', '20px');
            } else {
              element.css('top', ($window.innerHeight) - 88 + 'px');
              element.css('left', '20px');
          } 
        });
      }
    }
}]);

layoutManagerDirectives.directive('rescueControlPosition', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          if(scope.isPhone) {
            element.css('top', ($window.innerHeight) - 250 + 'px');
            element.css('left', '-3px');  
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', ($window.innerHeight) - 245 + 'px');
              element.css('left', '9px'); 
          } else {
            element.css('top', ($window.innerHeight) - 305 + 'px');
            element.css('left', '10px');
          }  
        });
        angular.element(document).ready(function() {
          if(scope.isPhone) {
              element.css('top', ($window.innerHeight) - 250 + 'px');
              element.css('left', '-3px');   
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', ($window.innerHeight) - 245 + 'px');
              element.css('left', '9px');
          } else {
              element.css('top', ($window.innerHeight) - 305 + 'px');
              element.css('left', '10px');
          }  
        });  
      }
    }
}]);

layoutManagerDirectives.directive('jobStrikesControlPosition', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          if(scope.isPhone) {
            element.css('top', ($window.innerHeight) - 390 + 'px');
            element.css('left', '-3px');  
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', ($window.innerHeight) - 385 + 'px');
              element.css('left', '9px'); 
          } else {
            element.css('top', ($window.innerHeight) - 455 + 'px');
            element.css('left', '10px');
          }  
        });
        angular.element(document).ready(function() {
          if(scope.isPhone) {
              element.css('top', ($window.innerHeight) - 390 + 'px');
              element.css('left', '-3px');   
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', ($window.innerHeight) - 385 + 'px');
              element.css('left', '9px');
          } else {
              element.css('top', ($window.innerHeight) - 455 + 'px');
              element.css('left', '10px');
          } 
        });
      }
    }
}]);

layoutManagerDirectives.directive('exitControlPosition', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          var xImageElement = angular.element(document.getElementById('exit-control-image'));
          var width = xImageElement.innerWidth;
          var height = xImageElement.innerHeight; 
          if(scope.isPhone) {
            xImageElement.css('width', '114%');
            element.css('top', '8px');
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', '4px');
              element.css('left', '18px');
          } else {
            element.css('top', '17px');
            element.css('left', '18px'); 
          }  
        });
        angular.element($window).bind('load', function(e) {
          var xImageElement = angular.element(document.getElementById('exit-control-image'));
          var width = xImageElement.innerWidth;
          var height = xImageElement.innerHeight;
          if(scope.isPhone) {
              xImageElement.css('width', '114%');
              element.css('top', '8px');
              element.css('left', '8px');    
          } else if (scope.isTablet && scope.isLandscape) {
              element.css('top', '4px');
              element.css('left', '18px');
          } else {
            element.css('top', '17px');
            element.css('left', '18px'); 
          } 
        });    
      }
    }
}]);





