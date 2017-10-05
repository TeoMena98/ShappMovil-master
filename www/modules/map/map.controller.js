angular.module('shapp').controller('MapCtrl', MapCtrl);

function MapCtrl($scope, $sessionStorage, $ionicLoading, $state, Map, urlImage, uiGmapGoogleMapApi){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  vm.map = { center: { latitude: 6.2015753, longitude: -75.57232619999999 }, zoom: 6};
  vm.defaultMap = vm.map
  Map.getMap($scope.$storage.uuid,$scope.$storage.brand.marcaId)
  .success(function(res){
  	vm.almacenes = res.mensaje;
    vm.almacenesDefault = res.mensaje;
    vm.item = -1
    angular.forEach(vm.almacenes, function(v, k) {
         latAux = v.latitud;
         lngAux = v.longitud;
         v.coords = {
           latitude: latAux,
           longitude: lngAux
         }
         v.options = {
           icon:'img/map.svg'
         }
       })
    vm.map = { center: { latitude: vm.almacenes[0].coords.latitude, longitude: vm.almacenes[0].coords.longitude }, zoom: 6};
    uiGmapGoogleMapApi.then(function (maps) {
      console.log(maps)
    });
  })
  vm.address = function(address){
    vm.item = address.id
    vm.almacenes = {}
    vm.almacenes[0] = address
    vm.map = { center: { latitude: address.coords.latitude, longitude: address.coords.longitude }, zoom: 12};
  }
  vm.addressDefault = function(){
    vm.item = -1
    vm.almacenes = vm.almacenesDefault
    vm.map = { center: { latitude: vm.almacenesDefault[0].coords.latitude, longitude: vm.almacenesDefault[0].coords.longitude }, zoom: 6};
  }
} 