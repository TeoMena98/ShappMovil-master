angular.module('shapp').controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($ionicLoading, $sessionStorage, $cordovaToast, $scope, $ionicModal, $state, Profile, urlImage, $timeout, $ionicHistory){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;
  if($scope.$storage.user.fbId){
    vm.validClass = 'sh-last-item'
  }else{
    vm.validClass = ''
  }
  $ionicLoading.show({
      template: 'Cargando...'
    });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  var validate = function(){
    if(!vm.form){
      $cordovaToast.showLongBottom('No has completados los campos');
      return false;
    }else if (!vm.form.name) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu nombre.');
      return false;
    }else if (!vm.form.email) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu correo.');
      return false;
    }else if (!vm.form.cel) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu número de celular.');
      return false;
    }else if (!vm.form.dep) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste seleccionar tu departamento.');
      return false;
    }else if (!vm.form.city) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste seleccionar tu ciudad.');
      return false;
    }else if (!vm.form.dir) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu dirección.');
      return false;
    }else if (!vm.form.date) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu fecha de nacimiento.');
      return false;
    }
    if($scope.$storage.user.fbId){
      vm.form.pass1 = null
    }else if (!vm.form.pass1) {
      $cordovaToast.showLongBottom('¡Ups!, parece que olvidaste escribir tu contraseña.');
      return false;
    }else if (!vm.form.pass2) {
      $cordovaToast.showLongBottom('¡Ups!, debes volver a escribir tu contraseña.');
      return false;
    }else if (vm.form.pass1!=vm.form.pass2) {
      $cordovaToast.showLongBottom('¡Ups!, las contraseñas que escribiste no son iguales.');
      return false;
    }
    return true;

    
  }
  Profile.departamentos($scope.$storage.uuid)
  .then(function(res){
    vm.dep = res.data.mensaje
  })

  vm.form = []
  vm.form.gen = 'M'
  vm.form.name = $scope.$storage.user.name
  vm.form.email = $scope.$storage.user.email
  vm.readonly = true
  Profile.takePerfil($scope.$storage.uuid)
  .then(function(res){
    if(res.data.mensaje != 'vacio'){
      vm.form.name = res.data.mensaje.nombre
      vm.form.email = res.data.mensaje.correo
      if(res.data.mensaje.genero){
        vm.form.gen = res.data.mensaje.genero
        vm.form.cel = res.data.mensaje.celular
        vm.form.dir = res.data.mensaje.direccion
        vm.form.city = res.data.mensaje.ciudad
        vm.form.dep = res.data.mensaje.departamento
        vm.cityChange()
        ms = Date.parse(res.data.mensaje.fechaNacimiento);
        vm.form.date = new Date(ms + 86400000)
      }
    }
  })
  vm.cityChange = function(){
    Profile.ciudades($scope.$storage.uuid,vm.form.dep)
    .then(function(res){
      vm.city = res.data.mensaje
    })
    
  }
  vm.readonlyChage = function(){
    vm.readonly = !vm.readonly
    $timeout(function() {
      document.getElementById('focus').focus()
    }, 200);
  }
  vm.genChange = function(val){
    vm.form.gen = val
  }
  vm.updateProfile = function(){
    if(validate()){
      Profile.updatePerfil($scope.$storage.uuid,vm.form)
      .then(function(res){
        if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
        }
        else{
          $cordovaToast.showLongBottom('Actualización realizada');
        }
        $scope.$storage.validarRetoUp = 'ok'
        $ionicHistory.goBack(-1);
        
      })
    }
  }

};
