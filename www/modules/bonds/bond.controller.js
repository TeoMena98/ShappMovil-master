angular.module('shapp').controller('bondCtrl', bondCtrl);

function bondCtrl($scope, $ionicPopup, $cordovaToast, $sessionStorage, $ionicLoading, $state, Bond, urlImage, $ionicPopover, $cordovaPrinter, $cordovaSocialSharing){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  //var printerAvail = $cordovaPrinter.isAvailable()
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
  vm.showConfirm = function(id) {
    var confirmPopup = $ionicPopup.confirm({
      template: '¿Estás seguro que deseas comprar este bono?',
      cancelText: 'No, gracias',
      okText: 'Si'
    });
    confirmPopup.then(function(res) {
      if(res) {
        Bond.comprarBonos($scope.$storage.uuid,id)
        .success(function(res){
          if(res.type == 'WARNING')
            $cordovaToast.showLongBottom(res.mensaje);
          else{
            $cordovaToast.showLongBottom("Compra exitosa");
            vm.cod = res.mensaje.codigo
            $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) - parseInt($scope.$storage.bond.costo)
          }
        })
        
      }
    });
  };
} 