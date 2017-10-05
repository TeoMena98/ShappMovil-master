angular.module('shapp').factory('Bond', Bond);

function Bond($http, urlService) {

  function comprarBonos(uuid,idBono){
    return $http({
      url : urlService + 'bonosUsuarios/comprarBono/'+idBono,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
  	comprarBonos:comprarBonos
  }
};