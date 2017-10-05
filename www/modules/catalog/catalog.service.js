angular.module('shapp').factory('catalogService', catalogService);

function catalogService($http, urlService) {

  function getCategories(id){
    return $http.get(urlService + 'menu/listMovil/' + id);
  }

  function getProducts(id){
  	return $http.post(urlService + 'producto/listMovil/' + id);
  }

  return{
    getCategories:getCategories,
    getProducts:getProducts
  }
}


