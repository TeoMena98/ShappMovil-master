angular.module('shapp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($ionicHistory, $scope, /*$cordovaToast*/ $state, $sessionStorage, $ionicLoading, loginService, FbService, OAuth, $ionicHistory){

  var vm = this;
  $scope.$storage = $sessionStorage;
  $scope.$storage.platform = localStorage.platform
  if(!$scope.$storage.user)
    $scope.$storage.user = {};
  if($scope.$storage.platform != 'ios'){
    $scope.classPlataform = 'sh-button-index-gr'
  }
  else{
    $scope.classPlataform = 'sh-button-index-sh'
  }
  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  if(OAuth.validSesion($scope, $sessionStorage, $state)){
    $scope.$storage.typeBlock = 'block'
  }
  else{
    $scope.$storage.typeBlock = 'none'
  }
  vm.backLogin = function(){
    $ionicHistory.goBack()
  }
  

  var validate = function(){
    if(!vm.form){
      /*$cordovaToast.showLongBottom("¡Ups!, parece que olvidaste escribir tu correo");*/
      return false;
    }else if (!vm.form.login) {
      /*$cordovaToast.showLongBottom("¡Ups!, parece que olvidaste escribir tu correo");*/
      return false;
    }else if (!vm.form.password) {
      /*$cordovaToast.showLongBottom("¡Ups!, parece que olvidaste escribir tu contraseña");*/
      return false;
    }
    return true;
  }
  vm.visitante = function () {
    $scope.$storage.user.name = 'Invitado';
    $scope.$storage.user.coins = 0;
    $scope.$storage.uuid = {}
    $scope.$storage.uuid.uuid = {}
    $scope.$storage.uuid.uuid.level = 'Shapp Babby'
    $scope.$storage.uuid.uuid.correo = 'vacio'
    $scope.$storage.uuid.uuid.exp = 0
    $scope.$storage.uuid.uuid.id = -1
    $scope.$storage.uuid.uuid.register = false
    $scope.$storage.uuid.uuid.nombre = 'Invitado'
    $scope.$storage.uuid.invitado = true
    localStorage.invitado = true
    localStorage.validFirtPag = 'true'
    /*$cordovaToast.showLongBottom('Hola Invitado, Bienvenido a Shapp');*/
    $state.go('app.home');
  }
  vm.login = function(){
    if(validate()){
      loginService.login(vm.form)
      .then(function(res){
        if(res.data.type=='OK'){
          localStorage.userEmail = vm.form.login;  
          $scope.$storage.user.email = vm.form.login;
          localStorage.userName = res.data.mensaje.nombre;
          $scope.$storage.user.name = res.data.mensaje.nombre;
          localStorage.userCoins = res.data.mensaje.monedas;
          $scope.$storage.user.coins = res.data.mensaje.monedas;
          localStorage.uuid = JSON.stringify(res.data.mensaje);
          $scope.$storage.uuid = {uuid:res.data.mensaje};
          $scope.$storage.uuid.invitado = false
          localStorage.invitado = false
          localStorage.validFirtPag = 'true'
          /*$cordovaToast.showLongBottom('Hola '+res.data.mensaje.nombre+', Bienvenido a Shapp');*/
          $state.go('app.home');
        }
        else{
          /*$cordovaToast.showLongBottom('¡Ups!, algo salió mal, vuélvelo a intentar');*/
        }
      })
    }
  }

  vm.loginFacebook = function(){
    FbService.loginStatus()
    .then(function(res) {
      if(res.status == 'connected') {
        FbService.me()
        .then(function(me){
          var form = {'name':me.name ,'email': me.email, 'pass': me.id};
          loginService.loginFb(form)
          .then(function(u){
            localStorage.uuid = JSON.stringify(u.data.mensaje)
            $scope.$storage.uuid = {uuid:u.data.mensaje};
            $scope.$storage.uuid.invitado = false
            localStorage.invitado = false
            localStorage.userName = me.name;                
            $scope.$storage.user.name = me.name;
            localStorage.userEmail = me.email;  
            $scope.$storage.user.email = me.email;
            localStorage.userCoins = u.data.mensaje.monedas
            $scope.$storage.user.coins = u.data.mensaje.monedas;
            localStorage.userFbId = me.id;  
            $scope.$storage.user.fbId = me.id;
            localStorage.validFirtPag = 'true'
            if(u.data.mensaje.register){
              /*$cordovaToast.showLongBottom('Acabas de recibir 3 monedas como bienvenida a Shapp');   */           
            }
            FbService.picture(me.id)
            .then(function(picture){
              localStorage.userPicture = picture.data.url  
              $scope.$storage.user.picture = picture.data.url;
            })
            /*$cordovaToast.showLongBottom('Hola '+$scope.$storage.user.name+', Bienvenido a Shapp');*/
            $state.go('app.home');
          });
        })
      }
      if(res.status == 'unknown' || res.status == 'unauthorized') {
        alert('Debes registrarte');
        FbService.login()
        .then(function(res) {
          alert('Bienvenido de nuevo');
          vm.loginFacebook()
        });
      }
    });
  }


}