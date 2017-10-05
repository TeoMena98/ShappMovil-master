angular.module('shapp').controller('MyShappCtrl', MyShappCtrl);

function MyShappCtrl($scope, $sessionStorage, $ionicLoading, $state, MyShapp, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  MyShapp.getMyShapp($scope.$storage.uuid)
  .success(function(res){
  	vm.myshapp = res.mensaje;
  })

  vm.showBrand = function(brand){
    $scope.$storage.brand = brand;
    $state.go('app.brand');
  }
} 