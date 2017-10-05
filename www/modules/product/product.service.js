angular.module('shapp').factory('productService', productService);

function productService($http, urlService){

  function getTrends(uuid){
    return $http({
    	url : urlService + 'producto/productosTendencias/',
    	method : "POST",
    	data: uuid,
    	headers:{
    		'Content-Type':'application/json'
    	}
    });
  }

  function getProducts(idCatalog, idCategory, uuid){
    return $http({
      url : urlService + 'producto/movil/listProducts/'+idCatalog+"/"+idCategory,
      method : "POST",
      data: uuid,
      headers:{
        'Content-Type':'application/json'
      }
    }); 
  }

  function getAtributos( idProducto, uuid){
    return $http({
      url : urlService + 'atributos/getGeneral/'+idProducto,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'text/plain'}
    }); 
  }
  function getColores( idAtributo, uuid){
    return $http({
      url : urlService + 'atributos/getColorByAttribute/'+idAtributo,
      method : "POST",
      data: uuid,
      headers:{
        'Content-Type':'application/json'
      }
    }); 
  }

  function getOthers( idAtributo, uuid){
    return $http({
      url : urlService + 'atributos/getOthersByAttribute/'+idAtributo,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'text/plain'}
    }); 
  }

  return{
    getTrends:getTrends,
    getProducts:getProducts,
    getAtributos: getAtributos,
    getOthers: getOthers,
    getColores: getColores

  }
}


  


