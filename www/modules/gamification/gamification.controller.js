angular.module('shapp').controller('GamificationCtrl', GamificationCtrl);

function GamificationCtrl($scope, $sessionStorage, $timeout, $ionicLoading, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;
  if($scope.$storage.validarRetoUp == 'ok'){
  	$scope.RetoUp = 'sh-done';
  }
  else{
  	$scope.RetoUp = '';
  }
  if($scope.$storage.uuid.invitado){
    $scope.validRegister = '';
  }
  else{
    $scope.validRegister = 'sh-done';
  }

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  

}