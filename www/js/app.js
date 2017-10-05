// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('shapp', ['ionic','ionic.service.core', 'mb-adaptive-backgrounds','ngStorage', 'ngCordova', 'youtube-embed', 'uiGmapgoogle-maps', 'ionic-zoom-view'])

.run(function($ionicPlatform, $rootScope, $window, $state, $http, $filter,
   $sessionStorage, $cordovaNetwork, $cordovaPush, urlService) {
  if(ionic.Platform.isIOS()){
    localStorage.platform = 'ios'
  }
  else{
    localStorage.platform = 'android'
  }
  $ionicPlatform.ready(function() {

    
    document.addEventListener("deviceready", function(){
      var push = new Ionic.Push({
        "debug": true
      });
      push.register(function(token) {
        localStorage.token = token.token
        console.log("Device token:",localStorage.token);
      });
    })

    window.addEventListener('native.keyboardshow', function(e){
      //document.body.classList.add('keyboard-open');
      console.log("e.keyboardHeight: " + e.keyboardHeight);
    });
/*
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
*/
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      $state.go('app.home')
    });

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $window.location.href = '#offline';
    });

    var reportNewUse = function(){
      $http({
              method: 'POST',
              data: $sessionStorage.uuid,
              url: urlService + 'retos/usoShapp/' + $sessionStorage.uuid.uuid.id,
              headers: {
                'Content-Type': 'application/json'
              }})
            .then(function(res){
              console.log(res);
            })
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      
      $sessionStorage.previousState = fromState.name;
      if(fromState.name == 'home' && toState != 'loginHome'){
        var currentDate = new Date();
        currentDate = $filter ('date') (currentDate, 'yyyy-MM-dd')
        if($sessionStorage.lastUse){
          if(currentDate != $sessionStorage.lastUse){
            reportNewUse();
          }
        }else{
          reportNewUse();
          $sessionStorage.lastUse = currentDate;
        }
      }

      
    });

    closeApp = function() {
      cordova.plugins.Keyboard.closeApp();
    };
    if($window.location.hash.replace('#/', '') == 'loginHome') {
      $ionicPlatform.onHardwareBackButton(closeApp);
    } else {
      $ionicPlatform.onHardwareBackButton($state.go($sessionStorage.previousState));
    }
    
//    $ionicPlatform.onHardwareBackButton(closeApp);
/*
    $rootScope.$on('$locationChangeSuccess', function(event) {
      $rootScope.toggledrag = true;
      if($window.location.hash.replace('#/', '') == 'suscritos') {
        $rootScope.toggledrag = false;
      }
      if($window.location.hash.replace('#/', '') == 'categorias') {
        $rootScope.toggledrag = false;
      }
      if($window.location.hash.replace('#/', '') == 'productosList') {
        $rootScope.toggledrag = false;
      }
      if($window.location.hash.replace('#/', '') == 'loginHome') {
        $ionicPlatform.onHardwareBackButton(closeApp);
      } else {
        $ionicPlatform.offHardwareBackButton(closeApp);
      }
    });*/

    /*$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      console.log('Got token', data);
    });*/
  });
  
});
