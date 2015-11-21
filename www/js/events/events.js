angular.module('starter.events', ['ngOpenFB'])

.controller('eventsController', ['$scope', '$openFB', 'ClientHelper', '$location', function ($scope, $openFB, ClientHelper, $location) {
  console.log('eventsController')
  $scope.testWord = 'testing testing';
  var events = [
    {
      name: 'Party',
      description: 'awesome time!',
      startTime: 12,
      endTime: 1,
      date: 2,
      location:
      {
        Street: 'Jones Street',
        City: 'SF',
        State: 'CA',
        ZIP: 55555
      }
    },
    {
      name: 'Party',
      description: 'awesome time!',
      startTime: 12,
      endTime: 1,
      date: 3,
      location:
      {
        Street: 'Jones Street',
        City: 'SF',
        State: 'CA',
        ZIP: 55555
      }
    },
    {
      name: 'Party',
      description: 'awesome time!',
      startTime: 12,
      endTime: 1,
      date: 1,
      location:
      {
        Street: 'Jones Street',
        City: 'SF',
        State: 'CA',
        ZIP: 55555
      }
    },
    {
      name: 'Party',
      description: 'awesome time!',
      startTime: 12,
      endTime: 1,
      date: 0,
      location:
      {
        Street: 'Jones Street',
        City: 'SF',
        State: 'CA',
        ZIP: 55555
      }
    }
  ]
  $scope.eventData = {};
  $scope.eventData.events = events;

  $scope.me = {};
  $scope.logout = function () {
    $openFB.logout();
  };

  $openFB.init( {appId: '1520991081546037'})

  $openFB.login({scope: 'email, user_friends'})

  .then(function (res) {
    $openFB.api({path: '/me'})
    .then(function (res) {
      angular.extend($scope.me, res);
    }, function( err ) {
      console.log(err);
    });

    $openFB.api({path: '/me/friends'})
    .then(function (res) {
      angular.extend($scope.me, res);
    }, function (err) {
      console.log(err);
    });

    $openFB.api({
      path: '/me/picture',
      params: {
          redirect: false,
          height: 50,
          width: 50
      }
    }).then(function( res ) {
      console.log('events scope.me',$scope.me)
      angular.extend($scope.me, {picture: res.data.url});
      ClientHelper.getFBdata($scope.me);
    }).then(function() {
      $location.path('/events'); // '/map'
    });
  })
}

]);
