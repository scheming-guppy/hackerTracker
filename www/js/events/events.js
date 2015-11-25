angular.module('starter.events', ['ngOpenFB'])
.factory('getEvents', function ($http, $location, $window){
  var location;
  var getEvent = function (event) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8100/api/events',
    })
    .then(function (resp) {
      return resp.data;
    })
  }
  var locationInfo = function (input) {
    location = input;
  }
  var returnLocation = function () {
    return location;
  }
  return {
    getEvent: getEvent,
    locationInfo: locationInfo,
    returnLocation: returnLocation
  }

})

.controller('eventsController', ['$scope', '$openFB', 'ClientHelper', '$location','getEvents', function ($scope, $openFB, ClientHelper, $location, getEvents) {
   var msToTime = function (duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes;
    }

  $scope.eventData = {};
  getEvents.getEvent()
  .then(function (events) {
    events.forEach(function(ele) {
      ele.startTime = msToTime(ele.startTime);
      ele.endTime = msToTime(ele.endTime);
    })
    $scope.eventData.events = events;
  });
$scope.getLocationInfo = function (input) {
  getEvents.locationInfo(input)
}

}
]);
