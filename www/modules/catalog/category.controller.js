angular.module('shapp').controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl($scope, $sessionStorage, $ionicLoading, $state, $stateParams, $timeout, urlImage, 
                      catalogService){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  vm.showCategory = function (category){
    $scope.$storage.category = category;
    $state.go('category');
  }

} 