angular.module('shapp').controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl($scope, $sessionStorage, $ionicLoading, $state, CategorySrv, urlImage, $ionicHistory){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  CategorySrv.getCategory($scope.$storage.uuid)
  .success(function(res){
  	vm.category = res.mensaje;
  })

  vm.showBrand = function(category){
    $scope.$storage.category = category;
    $state.go('app.BrandByCategory');
  }
  vm.back = function(){
    $state.go('app.home');
    //console.log($scope.$storage.previousState)
  }
} 