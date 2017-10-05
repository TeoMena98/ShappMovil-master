angular.module('shapp').factory('Bonds', Bonds);

function Bonds($http, urlService) {

  function getBonds(uuid){
    return $http({
      url : urlService + 'bonosUsuarios/listAllBonos/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function getBondsComprados(uuid){
    return $http({
      url : urlService + 'bonosUsuarios/bonosComprados/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function getBondsProm(uuid){
    return $http({
      url : urlService + 'Bonos/bonosYPromLimit',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
  	getBonds:getBonds,
    getBondsComprados:getBondsComprados,
    getBondsProm:getBondsProm
  }
};