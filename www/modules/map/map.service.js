angular.module('shapp').factory('Map', Map);

function Map($http, urlService) {

  function getMap(uuid,idProv){
    return $http({
      url : urlService + 'almacen/movil/listAlmacenes/'+idProv,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    }); 
  }

  return{
  	getMap:getMap
  }
};