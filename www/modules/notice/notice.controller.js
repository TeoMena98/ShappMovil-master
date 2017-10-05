angular.module('shapp').controller('NoticeCtrl', NoticeCtrl);

function NoticeCtrl($scope, $sessionStorage, $ionicLoading, $state, Notice, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  Notice.getNotice($scope.$storage.uuid,$scope.$storage.brand.marcaId)
  .success(function(res){
  	vm.notice = res.mensaje;
    console.log(vm.notice)
  })

  vm.showVideo = function(video){
    $scope.$storage.video = video;
    $state.go('video');
  }
} 