angular.module('shapp').controller('bondsCtrl', bondsCtrl);

function bondsCtrl($scope, $sessionStorage, $ionicLoading, $state, Bonds, urlImage, $ionicPopover){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  $ionicPopover.fromTemplateUrl('modules/bonds/help.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.help = popover;
  });

  vm.openHelp = function($event) {
    $scope.help.show($event);
  };

  Bonds.getBonds($scope.$storage.uuid)
  .success(function(res){
    if(res.mensaje != 'vacio'){
    	vm.bonds = res.mensaje;
      for(var i = 0;i < vm.bonds.length;i++){
        if(vm.bonds[i].descripcion.length > 95){
          vm.bonds[i].desAux = vm.bonds[i].descripcion.substring(0,96) + ' ...'
        }else{
          vm.bonds[i].desAux = vm.bonds[i].descripcion
        }
      }
    }
  })
  vm.showBond = function(bond){
    if(!$scope.$storage.uuid.invitado){
      $scope.$storage.bond = bond;
      $state.go('app.bond');
    }
  }
  
} 