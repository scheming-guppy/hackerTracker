// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'starter.facebook',
  'starter.home',
  'starter.map',
  'starter.maker',
  'starter.services',
  'starter.makeEvent',
  'ngMap'
  ])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('home');

  $stateProvider
    // .state('/', {
    //   url: '/home'
    // })
    .state('home', {
      url: '/home',
      templateUrl: 'js/home/home.html',
      controller: 'HomeController'
    })
    .state('facebook', {
      url: '/facebook',
      templateUrl: 'js/facebook/facebook.html',
      controller: 'FacebookController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'js/map/map.html',
      controller: 'MapController'
    })
    .state('mapMaker', {
      url: '/mapMaker',
      templateUrl: 'js/mapMaker/mapMaker.html',
      controller: 'MapMakerController'
    })
    .state('logout', {
      url: '/home',
      templateUrl: 'js/home/home.html'
    })
    .state('makeEvent', {
      url: '/makeEvent',
      templateUrl: 'js/makeEvent/makeEvent.html',
      controller: 'MakeEventController'
    })

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
