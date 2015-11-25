angular.module('starter.makeEvent', [])
.factory('eventCreate', function ($http, $location, $window){
  var makeEvent = function (event) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8100/api/events',
      data: event
    })
    .then(function (resp) {
      console.log("yey")
    })
  };
  return {
    makeEvent: makeEvent
  }

})

.controller('MakeEventController', ['$scope', 'eventCreate', '$openFB', 'ClientHelper', function ($scope, eventCreate, $openFB, ClientHelper) {
  $scope.event = {};
  $scope.event.address = {};
  $scope.friends = [];
  $scope.event.friends = [];
  $scope.mydata = ClientHelper.getFBdata();
  console.log(ClientHelper.getFBdata())
  $scope.makeEvent = function () {
    $scope.event.startTimeString = $scope.event.startTime.getTime();
    $scope.event.endTimeString = $scope.event.endTime.getTime();
    console.log('event',$scope.event);
    eventCreate.makeEvent($scope.event);
  }
  $scope.getFriends = function () {
    $openFB.api({path: '/me/friends'})
    .then(function (res) {
      $scope.friends = res.data;
    }, function (err) {
      console.log(err);
    });
  }
  $scope.myInfo = function () {
    $openFB.api({path: '/me'})
    .then(function (res) {
      $scope.event.createdBy = res.id;
    }, function (err) {
      console.log(err);
    });

  }
  $scope.selectFriends = function() {
    var obj = {};
    for(var i = 0; i < $scope.friends.length; i++) {
      if($scope.friends[i].name == $('#friendsList').val()[0]) {
        obj.name = $scope.friends[i].name;
        obj.id = $scope.friends[i].id;
        $scope.event.friends.push(obj)
    }
  }
}
  $scope.getFriends();
  $scope.myInfo();
  // methods to be used inside home.html
}]);
