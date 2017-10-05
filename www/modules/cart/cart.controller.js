angular.module('shapp').controller('CartCtrl', CartCtrl);

function CartCtrl($scope, $ionicPopup, $cordovaToast, $sessionStorage, $ionicLoading, $state, Bond, urlImage, $ionicPopover, $cordovaPrinter, $cordovaSocialSharing){
  
  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  if(!localStorage.shop)
    localStorage.shop = '[]'
  vm.shop = JSON.parse(localStorage.shop)
 

  vm.cancel = function(posShop){
    vm.shop.splice(posShop,1);
    localStorage.shop = JSON.stringify(vm.shop)
  }

  /*vm.ShowBrand= function(){
    vm.brand = $storage.brand
    
  }*/
  vm.shopFinish = function(posShop){
    localStorage.shop = '[]'
    vm.shop = []
  }
 





  
} 