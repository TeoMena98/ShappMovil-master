angular.module('shapp').controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($ionicLoading, $sessionStorage, $cordovaToast, $scope, $ionicModal, $state, RegisterSrv){

  var vm = this;

  $ionicLoading.show({
      template: 'Cargando...'
    });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  var validate = function(){
    if(!vm.form){
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu nombre.');
      return false;
    }else if (!vm.form.name) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu nombre.');
      return false;
    }else if (!vm.form.email) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu correo.');
      return false;
    }else if (!vm.form.pass1) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu contraseña.');
      return false;
    }else if (!vm.form.pass2) {
      $cordovaToast.showLongBottom('¡Ups!, debes volver a escribir tu contraseña.');
      return false;
    }else if (vm.form.pass1!=vm.form.pass2) {
      $cordovaToast.showLongBottom('¡Ups!, las contraseñas que escribiste no son iguales.');
      return false;
    }else if (!vm.terms) {
      $cordovaToast.showLongBottom('¡Ups!, para ingresar a Shapp debes aceptar los términos y condiciones.');
      return false;
    }
    return true;
  }

  $scope.$storage = $sessionStorage;
  $scope.$storage.user = {};

  $ionicModal.fromTemplateUrl('modules/register/terms.tmpl.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    vm.modal = modal;
    $scope.modal = modal;
  });

  vm.acceptTerms = function(){
    vm.terms = true;
    vm.modal.hide();
  }

  vm.register = function(){
    if(validate()){
      var form = {email:vm.form.email,name:vm.form.name,pass:vm.form.pass1}
      RegisterSrv.registerEmail(form)
      .then(function(res){
        if(res.data.type=='OK'){
          $cordovaToast.showLongBottom('Hola '+vm.form.name+', Bienvenido a Shapp');
          localStorage.userEmail = vm.form.email;  
          $scope.$storage.user.email = vm.form.email;
          localStorage.userName = res.data.mensaje.nombre;
          $scope.$storage.user.name = res.data.mensaje.nombre;
          localStorage.userCoins = res.data.mensaje.monedas;
          $scope.$storage.user.coins = res.data.mensaje.monedas;
          localStorage.uuid = JSON.stringify(res.data.mensaje);
          $scope.$storage.uuid = {uuid:res.data.mensaje};
          //$scope.$storage.user.name = res.data.mensaje.id;
          //alert(JSON.stringify(res));
          $cordovaToast.showLongBottom('Acabas de recibir 3 monedas como bienvenida a Shapp');
          $state.go('app.home');
        }else{
          $cordovaToast.showLongBottom(res.data.mensaje);
        }
      })
    }
  }

};
