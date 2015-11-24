angular.module('starter.eventMap', ['ngOpenFB'])
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
.controller('EventMapController', ['$scope','$openFB','getEvents', 'getLocation', function ($scope, $openFB , getEvents, getLocation) {
  $scope.eventLocation = {};
  $scope.locationData = {};
  $scope.coords = {};
  $scope.images = [];
  $scope.newImages = [];
  var address;

  $scope.eventLocation.info = function () {
    $scope.locationData = getEvents.returnLocation()
  }
  $scope.eventLocation.info();
  var res = getLocation.locationSearch($scope.locationData)
res
  .then(function(result) {
    address = result.data.address;
    friends = result.data.friends;
    for (var i = 0; i < friends.length; i++) {
      $scope.images.push(friends[i].id)
    }
    for(var j = 0; j < $scope.images.length; j++) {
      $openFB.api({
      path: '/' + $scope.images[j] + '/picture',
      params: {
          redirect: false,
          height: 50,
          width: 50
      }
    }).then(function( res ) {
      $scope.newImages.push(res);
    if ($scope.newImages.length === $scope.images.length) {
        $scope.locationCheck();
      }
    });
    }
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
      $scope.coords.lat = results[0].geometry.location.lat()
      $scope.coords.lng = results[0].geometry.location.lng()
      console.log("lat", $scope.coords )
      console.log('friend pictures', $scope.newImages)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
   }
  });
  }
}])