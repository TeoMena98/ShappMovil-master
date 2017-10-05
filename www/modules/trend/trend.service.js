angular.module('shapp').factory('Trend', Trend);

function Trend($http, urlService) {
	
  function getTrends(uuid){
      return $http({
        method: 'POST',
        data: uuid,
        url: urlService + 'producto/productosTendenciasByCategoria/',
        headers: {
          'Content-Type': 'application/json'
        }})
    }

  return{
  	getTrends:getTrends
  }
};