var layoutManagerDirectives = angular.module('layoutManagerDirectives', ['matchmedia-ng']);


layoutManagerDirectives.directive('menuBottomEdge', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {
        angular.element($window).bind('resize', function(e) {
          var menuBarElement = angular.element(document.getElementById('menu-bar'));
          var menuItemsElement = menuBarElement.children().find('li');
          if(scope.isPhone) {
            menuItemsElement.addClass('display-hidden');
            menuItemsElement.removeClass('display-visible');
          } 
          menuItemsElement.removeClass('display-hidden');
          menuItemsElement.removeClass('display-visible');
          element.css('top', $window.innerHeight - 36 + 'px');
        });
        var menuBarElement = angular.element(document.getElementById('menu-bar'));
        var menuItemsElement = menuBarElement.children().find('li'); 
        if(scope.isPhone) {
          menuItemsElement.addClass('display-hidden');
          menuItemsElement.removeClass('display-visible');
        } 
        menuItemsElement.removeClass('display-hidden');
        menuItemsElement.removeClass('display-visible');
        element.css('top', $window.innerHeight - 36 + 'px');

      }
    }
}]);

layoutManagerDirectives.directive('viewportConstrain', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {
        
        angular.element($window).bind('resize', function(e) {
          element.css('width', $window.offsetWidth + 'px');
          element.css('height', $window.offsetHeight + 'px');
        });
        element.css('width', $window.offsetWidth + 'px');
        element.css('height', $window.offsetHeight + 'px');
      }
    }
}]);

layoutManagerDirectives.directive('spentLogoPosition', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if(scope.isPhone && scope.isLandscape) {
          var spentLogoImageElement = angular.element(document.getElementById('spent-logo-image'));
          spentLogoImageElement.css('top', ($window.innerHeight/2) - 38 + 'px');
          spentLogoImageElement.css('left', ($window.innerWidth/2) - 247 + 'px');
        } else if (scope.isPhone && scope.isPortrait) {
          element.css('top', $window.innerHeight - 28 + 'px');
          element.css('left', ($window.innerWidth/2) - 82 + 'px');       
        } else {
          element.css('top', $window.innerHeight - 82 + 'px');
          element.css('left', ($window.innerWidth/2) - 127 + 'px');      
        }  
      });
      
      if(scope.isPhone && scope.isLandscape) {
        var spentLogoImageElement = angular.element(document.getElementById('spent-logo-image'));
        spentLogoImageElement.css('top', ($window.innerHeight/2) - 38 + 'px');
        spentLogoImageElement.css('left', ($window.innerWidth/2) - 247 + 'px');
      } else if (scope.isPhone && scope.isPortrait) {
        element.css('top', $window.innerHeight - 28 + 'px');
        element.css('left', ($window.innerWidth/2) - 82 + 'px'); 
      } else {
        element.css('top', $window.innerHeight - 82 + 'px');
        element.css('left', ($window.innerWidth/2) - 127 + 'px');      
      }     
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
layoutManagerDirectives.directive('dayPositionUpdate', ['$window', '$parse', function($window, $parse) {
    return {
      priority: 1,
      link : function(scope, element, attrs) {
          angular.element($window).bind('load', function() {
            var position =  $parse(element[0].attributes['x-daydivtop'].nodeValue)(scope);
            var elementId = $parse(element[0].attributes['x-day-index'].nodeValue)(scope);
            scope.$apply("updateDayPositions('" + position + "','" + elementId + "')");
          }); 
          angular.element($window).bind('resize', function() {
            var position =  $parse(element[0].attributes['x-daydivtop'].nodeValue)(scope);
            var elementId = $parse(element[0].attributes['x-day-index'].nodeValue)(scope);
            scope.$apply("updateDayPositions('" + position + "','" + elementId + "')");
          }); 
        }
    };
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
          element.attr('x-dayDivTop', dayDivTop );
        } else {
          element.css('line-height', ($window.innerHeight)/42  + 'px');
          element.attr('x-dayDivTop', dayDivTop );

        }
      });
      angular.element(window).bind('load', function() {
        var containerElement = angular.element(document.getElementById('days-list-container'));
        var dayDivTop = element[0].offsetTop;   
        if ($window.innerHeight < 645) {
          element.css('line-height', ($window.innerHeight)/42  + 'px');
          element.attr('x-dayDivTop', dayDivTop );

        } else {
          element.css('line-height', ($window.innerHeight)/42  + 'px');
          element.attr('x-dayDivTop', dayDivTop );
        }  
      }); 
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

layoutManagerDirectives.directive('bankBalanceReadout', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          if(scope.isPhone) {
            element.css('left', '40px');  
          } else {
            element.css('left', '82px'); 
          }  
        });

        if(scope.isPhone) {
            element.css('left', '40px');     
        } else {
            element.css('left', '82px');   
        }     
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
          element.addClass('display-hidden');
          element.removeClass('display-visible');
        } else {
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');
          element.css('top', $window.innerHeight - 87 + 'px');
          element.css('left', ($window.innerWidth) - 196 + 'px');
        }

      });
        if (scope.isPhone || scope.isTablet) {
          element.addClass('display-hidden');
          element.removeClass('display-visible');
        } else {
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');
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
        if (scope.isPhone || scope.isTablet) {
          element.addClass('display-hidden');
          element.removeClass('display-visible');
        } else {
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');
          element.css('top', $window.innerHeight - 90 + 'px');
          element.css('left', ($window.innerWidth) - 60 + 'px');
        }
      });
      if (scope.isPhone || scope.isTablet) {
        element.addClass('display-hidden');
        element.removeClass('display-visible');
      } else {
        element.addClass('display-visible'); 
        element.removeClass('display-hidden');
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
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');    
        } else {
        element.addClass('display-hidden');
        element.removeClass('display-visible');
        }  
      });
      if(scope.isPhone) {
        element.css('top', $window.innerHeight - 32 + 'px');
        element.css('left', 9 + 'px');  
        element.addClass('display-visible'); 
        element.removeClass('display-hidden');    
      } else {
        element.addClass('display-hidden');
        element.removeClass('display-visible');
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

layoutManagerDirectives.directive('debug', ['$window', function($window) {
  return {
    link : function(scope, element, attr) {
      
      angular.element($window).bind('resize', function(e) {
        if(scope.debugMode) {
          var bgHeight = element[0].clientHeight;
          var bgWidth = element[0].clientWidth;
          element.css('top', (($window.innerHeight/2) - (bgHeight/2) - 50) + 'px');
          element.css('left', ($window.innerWidth/2) - (bgWidth/2) + 'px');  
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');    
        } else {
          element.addClass('display-hidden');
          element.removeClass('display-visible');
        }  
      });
      angular.element(window).bind('load', function() {
        if(scope.debugMode) {
          var bgHeight = element[0].clientHeight;
          var bgWidth = element[0].clientWidth;
          element.css('top', ($window.innerHeight/2) - (bgHeight/2) - 50 + 'px');
          element.css('left',($window.innerWidth/2) - (bgWidth/2) +  'px'); 
          element.addClass('display-visible'); 
          element.removeClass('display-hidden'); 
        } else {
          element.addClass('display-hidden');
          element.removeClass('display-visible');         
        }  
      });     
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
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');    
        } else {
          element.addClass('display-hidden');
          element.removeClass('display-visible');
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
          element.addClass('display-visible'); 
          element.removeClass('display-hidden');    
        } else {
          element.addClass('display-hidden');
          element.removeClass('display-visible');
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

        if(scope.isPhone) {
        var xImageElement = angular.element(document.getElementById('exit-control-image'));
        var width = xImageElement.innerWidth;
        var height = xImageElement.innerHeight;
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
      }
    }
}]);


layoutManagerDirectives.directive('spentBackground', ['$window', function($window) {
    return {
      link : function(scope, element, attr) {

        angular.element($window).bind('resize', function(e) {
          var bgHeight = element[0].offsetHeight;
          var bgWidth = element[0].offsetWidth;
          element.css('top', ($window.innerHeight/2) - (bgHeight/2) + 'px');
          element.css('left',($window.innerWidth/2) - (bgWidth/2) +  'px'); 
        });
        angular.element(window).bind('load', function() {
          var bgHeight = element[0].offsetHeight;
          var bgWidth = element[0].offsetWidth;
          element.css('top', ($window.innerHeight/2) - (bgHeight/2) + 'px');
          element.css('left',($window.innerWidth/2) - (bgWidth/2) +  'px');        
        });

      }
    }
}]);



