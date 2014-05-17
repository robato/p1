var dayDataServiceModule = angular.module('DayDataService', []);

dayDataServiceModule.factory("DayDataService", function ($rootScope) {
  var allDayData = 
  [
    {
      "dayDisplay" : "01", "isPayDay" : false
    },
    {
      "dayDisplay" : "02", "isPayDay" : false
    },
    {
      "dayDisplay" : "03", "isPayDay" : false
    },
    {
      "dayDisplay" : "04", "isPayDay" : false
    },
    {
      "dayDisplay" : "05", "isPayDay" : false
    },
    {
      "dayDisplay" : "06", "isPayDay" : false
    },
    {
      "dayDisplay" : "07", "isPayDay" : false
    },
    {
      "dayDisplay" : "08", "isPayDay" : false
    },
    {
      "dayDisplay" : "09", "isPayDay" : false
    },
    {
      "dayDisplay" : "10", "isPayDay" : true
    },
    {
      "dayDisplay" : "11", "isPayDay" : false
    },
    {
      "dayDisplay" : "12", "isPayDay" : false
    },
    {
      "dayDisplay" : "13", "isPayDay" : false
    },
    {
      "dayDisplay" : "14", "isPayDay" : false
    },
    {
      "dayDisplay" : "15", "isPayDay" : false
    },
    {
      "dayDisplay" : "16", "isPayDay" : false
    },
    {
      "dayDisplay" : "17", "isPayDay" : true
    },
    {
      "dayDisplay" : "18", "isPayDay" : false
    },
    {
      "dayDisplay" : "19", "isPayDay" : false
    },
    {
      "dayDisplay" : "20", "isPayDay" : false
    },
    {
      "dayDisplay" : "21", "isPayDay" : false
    },
    {
      "dayDisplay" : "22", "isPayDay" : false
    },
    {
      "dayDisplay" : "23", "isPayDay" : false
    },
    {
      "dayDisplay" : "23", "isPayDay" : false
    },
    {
      "dayDisplay" : "24", "isPayDay" : true
    },
    {
      "dayDisplay" : "25", "isPayDay" : false
    },
    {
      "dayDisplay" : "26", "isPayDay" : false
    },
    {
      "dayDisplay" : "27", "isPayDay" : false
    },
    {
      "dayDisplay" : "28", "isPayDay" : false
    },
    {
      "dayDisplay" : "29", "isPayDay" : false
    },
    {
      "dayDisplay" : "30", "isPayDay" : false
    }
  ];

  return allDayData;
});
