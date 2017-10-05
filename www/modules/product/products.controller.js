angular.module('shapp').controller('ProductCtrl', ProductCtrl);

function ProductCtrl(loading, $scope, $sessionStorage, $state, $ionicLoading, $stateParams, $timeout, urlImage, productService, brandService){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  loading.show($ionicLoading)

  vm.expand1 = function(name, id, item){
      $scope.$storage.productoDetail = {nameProducto:name,idProduct:id,indexList:item};
      $state.go('app.product');
  }
  if($scope.$storage.productsC.categoryId != -1){
    productService.getProducts($scope.$storage.productsC.catalogoId, $scope.$storage.productsC.categoryId, $scope.$storage.uuid)
    .then(function(res){
      vm.products = res.data.mensaje;
      $scope.$storage.productsList = vm.products;
      loading.hide($ionicLoading)
    })
  }
  else{
    brandService.getProductsByCatalogo($scope.$storage.productsC.catalogoId, $scope.$storage.uuid)
    .then(function(res){
      vm.products = res.data.mensaje;
      $scope.$storage.productsList = vm.products;
      loading.hide($ionicLoading)
    })


  }
}
   
      /*productService.getAtributos($scope.$storage.productsList.idProduct,$scope.$storage.uuid)
      .success(function(res){
vm.Attribute= res.mensaje;
      })
    


      productService.getColores($scope.$storage.uuid)    .success(function(res){
        vm.Colors= res.mensaje;})
  
  
  
      productService.getOthers($scope.$storage.uuid)    .success(function(res){
        vm.Others= res.mensaje;
    }*/