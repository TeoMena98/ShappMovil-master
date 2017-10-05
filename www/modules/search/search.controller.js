angular.module('shapp').controller('SearchCtrl', SearchCtrl);

function SearchCtrl(loading, $scope, $sessionStorage, $ionicLoading, $state, SearchSrv, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  loading.show($ionicLoading)

  

  SearchSrv.getBrands()
  .success(function(res){
  	vm.brands = res.mensaje;
    vm.brandsAux = []
    vm.brandsAux2 = res.mensaje
    loading.hide($ionicLoading)
  })

  vm.showBrand = function(brand){
    $scope.$storage.brand = brand;
    $state.go('app.brand');
  }
  vm.searchBrand = function(){
    if(vm.tag != ''){
      SearchSrv.searchBrand($scope.$storage.uuid,vm.tag)
      .success(function(res){
        vm.brandsAux = []
        for (var i = 0; i < res.mensaje.length; i++) {
          for (var j = 0; j < vm.brandsAux2.length; j++) {
            console.log(res.mensaje[i], vm.brandsAux2[j].marcaId)
            if(res.mensaje[i] == vm.brandsAux2[j].marcaId){
              vm.brandsAux.push(vm.brandsAux2[j])
            }
          }
        }
        vm.brands = vm.brandsAux
      })
    }
  }
  vm.searchValid = function (){
    if(vm.tag == ''){
      vm.brands = vm.brandsAux2
    }
  }
} 