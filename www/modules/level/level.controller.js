angular.module('shapp').controller('levelsCtrl', levelsCtrl);

function levelsCtrl($scope, $sessionStorage, $timeout, $ionicLoading, urlImage){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  if($scope.$storage.uuid.uuid.exp > 449){
  	$scope.validLevelM = ''
  	$scope.validLevelKg = 'sh-done'
  	$scope.validLevelW = 'sh-done'
  	$scope.validLevelY = 'sh-done'
  	$scope.validLevelKd = 'sh-done'
  	$scope.validLevelB = 'sh-done'
  }
  else if($scope.$storage.uuid.uuid.exp > 239){
  	$scope.validLevelM = 'sh-done'
  	$scope.validLevelKg = ''
  	$scope.validLevelW = 'sh-done'
  	$scope.validLevelY = 'sh-done'
  	$scope.validLevelKd = 'sh-done'
  	$scope.validLevelB = 'sh-done'
  }
  else if($scope.$storage.uuid.uuid.exp > 149){
  	$scope.validLevelM = 'sh-done'
  	$scope.validLevelKg = 'sh-done'
  	$scope.validLevelW = ''
  	$scope.validLevelY = 'sh-done'
  	$scope.validLevelKd = 'sh-done'
  	$scope.validLevelB = 'sh-done'
  }
  else if($scope.$storage.uuid.uuid.exp > 99){
  	$scope.validLevelM = 'sh-done'
  	$scope.validLevelKg = 'sh-done'
  	$scope.validLevelW = 'sh-done'
  	$scope.validLevelY = ''
  	$scope.validLevelKd = 'sh-done'
  	$scope.validLevelB = 'sh-done'
  }
  else if($scope.$storage.uuid.uuid.exp > 49){
  	$scope.validLevelM = 'sh-done'
  	$scope.validLevelKg = 'sh-done'
  	$scope.validLevelW = 'sh-done'
  	$scope.validLevelY = 'sh-done'
  	$scope.validLevelKd = ''
  	$scope.validLevelB = 'sh-done'
  }
  else {
  	$scope.validLevelM = 'sh-done'
  	$scope.validLevelKg = 'sh-done'
  	$scope.validLevelW = 'sh-done'
  	$scope.validLevelY = 'sh-done'
  	$scope.validLevelKd = 'sh-done'
  	$scope.validLevelB = ''
  }

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  

}