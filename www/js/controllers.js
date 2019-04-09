angular.module('starter.controllers', ['ionic', 'google.places'])

// Home controller
.controller('HomeCtrl', function($scope, $state, $ionicPopup, $timeout, $ionicHistory) {
  // map height
  $scope.mapHeight = 480;

  // show - hide booking form
  $scope.showForm = false;

  // show - hide modal bg
  $scope.showModalBg = false;

  // toggle form
  $scope.toggleForm = function() {
    $scope.showForm = !$scope.showForm;
    $scope.showModalBg = ($scope.showForm == true);
  }

  // list vehicles
  $scope.vehicles = [
    {
      name: 'Taxi',
      icon: 'icon-taxi',
      active: true
    },
    {
      name: 'SUV',
      icon: 'icon-car',
      active: false
    },
    {
      name: 'Car',
      icon: 'icon-sedan',
      active: false
    }
  ]

  // Note to driver
  $scope.note = '';

  // Promo code
  $scope.promo = '';

  // toggle active vehicle
  $scope.toggleVehicle = function(index) {
    for (var i = 0; i < $scope.vehicles.length; i++) {
      $scope.vehicles[i].active = (i == index);
    }
  }

  $scope.locationChanged = function (location) {
     alert(location);
  };

  function initialize() {
    // set up begining position
    var myLatlng = new google.maps.LatLng(21.0227358,105.8194541);

    // set option for map
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    };
    // init map
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    // assign to stop
    $scope.map = map;


    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('booking-info')[0].scrollHeight;
    // get booking form height
    var bookingHeight = document.getElementsByClassName('booking-form')[0].scrollHeight;
    // set map height = view height - info block height + booking form height

    $scope.mapHeight = viewHeight - infoHeight + bookingHeight;

  }
  // load map when the ui is loaded
  $scope.init = function() {
    initialize();
  }


  // Show note popup when click to 'Notes to driver'
  $scope.showNotePopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-note.html',
      title: 'Notes to driver',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.note) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.note;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      $scope.note = res;
    });
  };

  // Show promote code popup when click to 'Promote Code'
  $scope.showPromoPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-promo.html',
      title: 'Promo code',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.promo) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.promo;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      $scope.promo = res;
    });
  };

  // go to next view when the 'Book' button is clicked
  $scope.book = function() {
    // hide booking form
    $scope.toggleForm();

    // go to finding state
    $state.go('finding');
    //$state.go('tracking');
  }
})

// Payment Method Controller
.controller('PaymentMethodCtrl', function($scope, $state) {
  // default value
  $scope.choice = 'A';

  // change payment method
  $scope.changeMethod = function (method) {
    // add your code here

    // return to main state
    $state.go('home');
  }
})

// Finding controller
.controller('FindingCtrl', function($scope, Drivers, $state) {
  // get list of drivers
  $scope.drivers = Drivers.all();

  // start on load
  $scope.init = function() {
    setTimeout(function() {
      $state.go('driver');
    }, 1000)
  }
})

// Driver controller
.controller('DriverCtrl', function($scope, Drivers, $state, $ionicHistory) {
  // get driver profile
  // change driver id here
  $scope.driver = Drivers.get(1);

  // go to tracking screen
  $scope.track = function () {


    // go to tracking state
    $state.go('tracking');
  };
})

// Tracking controller
.controller('TrackingCtrl', function($scope, Drivers, $state, $ionicHistory, $ionicPopup) {
  // map object
  $scope.map = null;

  // map height
  $scope.mapHeight = 360;

  // get driver profile
  // change driver id here
  $scope.driver = Drivers.get(1);

  // ratings stars
  $scope.stars = [0, 0, 0, 0, 0];

  function initialize() {
    // set up begining position
    var myLatlng = new google.maps.LatLng(21.0227358,105.8194541);

    // set option for map
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    };
    // init map
    var map = new google.maps.Map(document.getElementById("map_tracking"), mapOptions);

    // assign to stop
    $scope.map = map;

    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('tracking-info')[0].scrollHeight;

    $scope.mapHeight = viewHeight - infoHeight;
  }

  function showRating() {
    $scope.data = {
      stars: $scope.stars
    }

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-rating.html',
      title: 'Thank you',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Submit</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.stars) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.stars;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      // save rating here

      // go to home page
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('home');
    });
  }

  $scope.$on('$ionicView.enter', function() {

  });

  // load map when the ui is loaded
  $scope.init = function() {
    setTimeout(function() {
      initialize();
    }, 200);

    // finish trip
    setTimeout(function() {
      showRating();
    }, 1000)
  }
})

// History controller
.controller('HistoryCtrl', function($scope, Trips) {
  // get list of trips from model
  $scope.records = Trips.all();
})

// Notification controller
.controller('NotificationCtrl', function($scope, Notifications) {
  // get list of notifications from model
  $scope.notifications = Notifications.all();
})

// Support controller
.controller('SupportCtrl', function($scope) {})

// Profile controller
.controller('ProfileCtrl', function($scope) {
 // user data
    $scope.user = {
      name: "Edward Thomas",
      profile_picture: "img/thumb/edward.png",
      phone: "+84941727190",
      email: "success.ddt@gmail.com"
    }
})

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $ionicHistory) {
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
})
