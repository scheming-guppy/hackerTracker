angular.module('starter.eventMap', [])
.factory('getLocation', function ($http, $location, $window){ 
   var locationSearch = function (event) {
    eventData = {};
    eventData.event = event;
    return $http({
      method: 'POST',
      url: 'http://localhost:8100/api/events/eventMap',
      data: eventData
    })
    .then(function (resp) {
      return resp;
    });
  };
  return {
    locationSearch: locationSearch
  }

} )
.controller('EventMapController', ['$scope','getEvents', 'getLocation', function ($scope, getEvents, getLocation) {
  $scope.eventLocation = {};
  $scope.locationData = {};
  var address;

  $scope.eventLocation.info = function () {
    $scope.locationData = getEvents.returnLocation()
  }
  $scope.eventLocation.info();
  var res = getLocation.locationSearch($scope.locationData)
res
  .then(function(result) {
    address = result.data.address
      $scope.locationCheck();
  })
  $scope.locationCheck = function () {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!', address);
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
      geocoder = new google.maps.Geocoder();
      var address1 = address.streetAddress + ", " + address.state + " ," + address.zip;
     geocoder.geocode( {address: address1}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) 
    {
      console.log(results[0].geometry.location.lat());
      console.log(results[0].geometry.location.lng())
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
   }
  });
  }
}])