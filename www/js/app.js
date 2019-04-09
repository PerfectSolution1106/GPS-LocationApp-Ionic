// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Home screen
  .state('home', {
    //cache: false,
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  // Choose payment method
  .state('payment_method', {
    url: '/payment-method',
    templateUrl: 'templates/payment-method.html',
    controller: 'PaymentMethodCtrl'
  })

  // Find a driver
  .state('finding', {
    url: '/finding',
    templateUrl: 'templates/finding.html',
    controller: 'FindingCtrl'
  })

  // Show driver profile
  .state('driver', {
    url: '/driver',
    templateUrl: 'templates/driver.html',
    controller: 'DriverCtrl'
  })

  // Tracking driver position
  .state('tracking', {
    url: '/tracking',
    templateUrl: 'templates/tracking.html',
    controller: 'TrackingCtrl'
  })

  // Show history
  .state('history', {
    url: '/history',
    templateUrl: 'templates/history.html',
    controller: 'HistoryCtrl'
  })

  // Show notifications
  .state('notification', {
    url: '/notification',
    templateUrl: 'templates/notification.html',
    controller: 'NotificationCtrl'
  })

  // Support form
  .state('support', {
    url: '/support',
    templateUrl: 'templates/support.html',
    controller: 'SupportCtrl'
  })

  // Profile page
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })

  // login screen
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

  // register screen
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'AuthCtrl'
  })
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
