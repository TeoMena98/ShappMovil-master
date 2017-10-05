angular.module('shapp').factory('CategorySrv', CategorySrv);

function CategorySrv($http, urlService) {

  function getCategory(uuid){
    return $http({
        method: 'POST',
        data: uuid,
        url : urlService + 'categoria/listadoCategorias/',
        headers: {
          'Content-Type': 'application/json'
        }})
    
  }

  return{
  	getCategory:getCategory
  }
};