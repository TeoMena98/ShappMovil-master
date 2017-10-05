angular.module('shapp').controller('CatalogCtrl', CatalogCtrl);

function CatalogCtrl($scope, $sessionStorage, $ionicLoading, $state, $stateParams, $timeout, urlImage, 
                      catalogService, brandService){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  vm.icon = 'ion-android-favorite-outline';

  vm.liked = function(){
    if(vm.icon =='ion-android-favorite'){
      vm.icon = 'ion-android-favorite-outline';
    }else{
      vm.icon = 'ion-android-favorite';
    }
  }

  if($scope.$storage.catalog.cantCategorias>0){
    brandService.getCatalog($scope.$storage.catalog.id, $scope.$storage.uuid)
    .then(function(cat){
      $scope.$storage.catalog.categories = cat.data.mensaje;
      vm.categories = cat.data.mensaje;
      for (var i = 0; i < $scope.$storage.catalog.categories.length; i++) {
        var aux = $scope.$storage.catalog.categories[i];
        if(aux.cantProductos>0){
          brandService.getProductsByCat(aux.id, aux.idCatalogo, $scope.$storage.uuid)
          .then(function(res){
            if(res.data.type=='OK'){
              aux.case1 = true;
              aux.products = res.data.mensaje;
            }
          })  
        }else{
          brandService.getSubCat(aux.id, $scope.$storage.uuid)
          .then(function(res){
            if(res.data.type=='OK'){
              if(res.data.mensaje=='vacio'){
                vm.case4 = true;
              }else{
                vm.case2 = true;
                console.log(i);  
                $scope.$storage.catalog.categories[i].subCategories = res.data.mensaje;
              }
            }
          })
        }
      }
    })
  }else{
    brandService.getProductsCatalog($scope.$storage.catalog.id, $scope.$storage.uuid)
    .then(function(cat){
      $scope.$storage.catalog.products = cat.data.mensaje;
      vm.case3 = true;
    })
  }
  
  /*catalogService.getCategories($scope.$storage.catalog.id)
  .success(function(res){
    vm.categories = res.mensaje.hijos;
    angular.forEach(vm.categories, function(v, k) {
      catalogService.getProducts(v.id)
      .success(function(res){
         v.products = res.mensaje;
      })
    })
  })*/


} 