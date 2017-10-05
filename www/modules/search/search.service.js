angular.module('shapp').factory('SearchSrv', SearchSrv);

function SearchSrv($http, urlService) {

  function getBrands(){
    return $http.post(urlService + 'marca/listarTodo');
  }
  function searchBrand(uuid,tag){
  	uuid.tag = tag
    return $http({
    	url : urlService + 'marca/searchMarca/',
    	method : "POST",
    	data: uuid,
    	headers:{
    		'Content-Type':'application/json'
    	}
    });
  }

  return{
  	getBrands:getBrands,
  	searchBrand:searchBrand
  }
};