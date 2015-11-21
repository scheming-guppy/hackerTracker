angular.module('starter.makeEvent', [])
.factory('eventCreate', function ($http, $location, $window){
  var makeEvent = function (event) {
    // return $http({
    //   method: 'POST',
    //   url: '/api/makeEvent',
    //   data: event
    console.log(event)
    // }
    // .then(function (resp) {
    //   resp.send(event)
    // })
  };
  return {
    makeEvent: makeEvent
  }

})

.controller('MakeEventController', ['$scope', 'eventCreate', '$openFB', function ($scope, eventCreate, $openFB) {
  $scope.event = {};
  $scope.event.address = {};
  $scope.friends = [];
  $scope.event.friends = []
  $scope.makeEvent = function () {
    // $scope.event.startTime = $scope.event.startTime.getTime();
    // $scope.event.endTime = $scope.event.endTime.getTime();
    eventCreate.makeEvent($scope.event);
    // .then(function (result) {
    //   console.log("It worked weeee");
    // })
  }
  $scope.getFriends = function () {
    $openFB.api({path: '/me/friends'})
    .then(function (res) {
      $scope.friends = res.data;
      console.log($scope.friends)
      console.log($scope.friends);
    }, function (err) {
      console.log(err);
    });
  }
  $scope.selectFriends = function() {
    var obj = {};
    for(var i = 0; i < $scope.friends.length; i++) {
      console.log($scope.friends[i].name === $('#friendsList').val())
      console.log("Thisis the val", $('#friendsList').val())
      if($scope.friends[i].name == $('#friendsList').val()[0]) {
        console.log('weeee')
        obj.name = $scope.friends[i].name;
        obj.id = $scope.friends[i].id;
        $scope.event.friends.push(obj)
    }
  }
}
  $scope.getFriends();
  // methods to be used inside home.html
}]);
