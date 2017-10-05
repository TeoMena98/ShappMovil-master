angular.module('shapp').factory('FbService', FbService);

function FbService($cordovaFacebook) {
  function share(data){
    $cordovaFacebook.getLoginStatus()
    .then(function(result) {
      if(result.status != 'connected') {
        alert('Debes iniciar sesión con facebook para compartir algo');
        login();
      }
    })
    return $cordovaFacebook.showDialog({
      method: 'feed',
      name: data.name || '',
      link: data.link || '',
      picture: data.pic || '',
      caption: data.caption || '',
      description: data.desc || ''
    })
  };
  function me(){
    return $cordovaFacebook.api("me?fields=name,email,picture,gender", ["public_profile", "email"]);
  };
  function picture(id){
    return $cordovaFacebook.api(id+"/picture?width=500&height=500&redirect=0", ["public_profile", "email"]);
  };
  function loginStatus(){
    return $cordovaFacebook.getLoginStatus();
  };
  function login(){
    return $cordovaFacebook.login(["public_profile", "email", "user_friends"]);
  };
  function logout(){
    if(typeof facebookConnectPlugin != 'undefined') {
      return $cordovaFacebook.logout();
    } else {
      return null;
    }
  }
  return{
    share : share,
    me : me,
    loginStatus : loginStatus,
    login : login,
    logout : logout,
    picture : picture 
  }
};
angular.module('shapp').factory('misShapp', function() {
  return {
    data: []
  };
});
angular.module('shapp').factory('OAuth', OAuth)

function OAuth () {
  return {
    validSesion: function($scope, $sessionStorage, $state){
      if(localStorage.uuid){
        $scope.$storage = $sessionStorage;
        $scope.$storage.user.email = localStorage.userEmail;
        $scope.$storage.user.name = localStorage.userName;
        $scope.$storage.user.coins = localStorage.userCoins;
        $scope.$storage.uuid = {uuid:JSON.parse(localStorage.uuid)};
        if(localStorage.invitado == 'false')
          $scope.$storage.uuid.invitado = false
        else
          $scope.$storage.uuid.invitado = true
        if(localStorage.userFbId){
          $scope.$storage.user.fbId = localStorage.userFbId;
          $scope.$storage.user.picture = localStorage.userPicture;
        }
        $state.go('app.home');
        return false
      }
      else{
        return true
      }
    }
  }
}
angular.module('shapp').factory('loading', loading)

function loading () {
  show = function($ionicLoading){
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
  },
  hide = function($ionicLoading){
    $ionicLoading.hide();
  }
  return{
    show:show,
    hide:hide
  }
}
