angular.module('shapp').controller('promNewCtrl', promNewCtrl);

function promNewCtrl($ionicPopup, $scope, $sessionStorage, $ionicLoading, $state, Notice, urlImage, $cordovaPrinter, $cordovaSocialSharing, $cordovaToast){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });
  Notice.getNoticeDate($scope.$storage.uuid)
  .success(function(res){
    vm.new = res.mensaje
  })
  Notice.getPromDate($scope.$storage.uuid)
  .success(function(res){
    vm.prom = res.mensaje
  })
  vm.openLightbox = function(url){
    $scope.data = {};
    $scope.data.url = vm.urlImage + url.url
    var myPopup = $ionicPopup.show({
      templateUrl: 'modules/home/lightbox.html',
      cssClass: 'modal-comment lightbox-modal',
      scope: $scope,
      buttons: [
        { 
          text: '<i class="ion-close-round"></i>',
          type: 'button-clear button-positive', 
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  }
  vm.myGoBack = function(){
    window.history.back();
  }

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
} 