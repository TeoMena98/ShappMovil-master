angular.module('shapp').controller('MyBondsCtrl', MyBondsCtrl);

function MyBondsCtrl($scope, $sessionStorage, $ionicLoading, $state, MyBonds, urlImage, $cordovaPrinter, $cordovaSocialSharing, $cordovaToast){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  MyBonds.getBondsComprados($scope.$storage.uuid)
  .success(function(res){
    if(res.mensaje != 'vacio')
      vm.bondsCom = res.mensaje;
  })
  vm.print = function(cod){
    if($cordovaPrinter.isAvailable()){
      var doc = "<html><body><p style='border:solid 1px #000'>Wm4McdR09M</p></body></html>";
      $cordovaPrinter.print(cod)
    }else{
      $cordovaToast.showLongBottom("No disponible en esta versión");
    }
    
  }
  vm.sendMail = function(cod){
    $cordovaSocialSharing.shareViaEmail(cod, 'Cupón', null, null, null, null)
    .then(function(result) {
      console.log(result)
      $cordovaToast.showLongBottom("Envio exitoso");
    }, function(err) {
      $cordovaToast.showLongBottom('¡Ups!, algo salió mal, vuélvelo a intentar');
    });
  }
  vm.myGoBack = function(){
    window.history.back();
  }

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
} 