angular.module('shapp').controller('TrendCtrl', TrendCtrl);

function TrendCtrl($scope, $sessionStorage, $ionicLoading, $state, Trend, urlImage, productService, $ionicSlideBoxDelegate){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  Trend.getTrends($scope.$storage.uuid)
  .success(function(res){
    vm.trends = {}
    angular.forEach(res.mensaje,function(value, key) {
      pos = 0
      pos2 = 0
      for (var i = 0; i < res.mensaje[key].length; i++) {
        if(((i % 3) == 0) && (i != 0)){
          pos++
          pos2 = 0
        }
        if(!vm.trends[key]){
          vm.trends[key] = {}
        }
        if(!vm.trends[key][pos]){
          vm.trends[key][pos] = {}
        }
        vm.trends[key][pos][pos2] = res.mensaje[key][i];
        pos2++
      }
    });
    console.log(vm.trends)
    $ionicSlideBoxDelegate.update()
  })
  vm.showProduct = function(trend){
    productService.getProducts(trend.idCatalogo, trend.idMenu, $scope.$storage.uuid)
    .then(function(res){
      $scope.$storage.productsList = res.data.mensaje;
      var indexList = 1
      for (var i = 0; i < $scope.$storage.productsList.length; i++) {
        if(trend.id == $scope.$storage.productsList[i].id){
          var indexList = i
        }
      }
      $scope.$storage.productoDetail = {nameProducto:trend.nombre,idProduct:trend.id,indexList:indexList};
      $state.go('app.product');
    })
  }
} 