angular.module('shapp').controller('BrandCategoryCtrl', BrandCategoryCtrl);

function BrandCategoryCtrl($scope, $sessionStorage, $ionicLoading, $state, BrandCategorySrv, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  BrandCategorySrv.getBrandByCategory($scope.$storage.uuid,$scope.$storage.category.id)
  .success(function(res){
    console.log(res)
    if(res.mensaje != 'vacio')
      vm.brandCategory = res.mensaje;
    else
      vm.brandCategory = {}
  })

  vm.showBrand = function(brand){
    $scope.$storage.brand = brand;
    $state.go('app.brand');
  }
} 