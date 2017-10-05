angular.module('shapp').controller('VideoCtrl', VideoCtrl);

function VideoCtrl($scope, $sessionStorage, $ionicLoading, $state, Videos, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });

  Videos.getVideos($scope.$storage.uuid,$scope.$storage.brand.marcaId)
  .success(function(res){
  	vm.videos = res.mensaje;
  })

  vm.showVideo = function(video){
    $scope.$storage.video = video;
    $state.go('video');
  }
} 