angular.module('shapp').factory('MyBonds', MyBonds);

function MyBonds($http, urlService) {
	
  function getBondsComprados(uuid){
    return $http({
      url : urlService + 'bonosUsuarios/bonosComprados/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
  	getBondsComprados:getBondsComprados
  }
};