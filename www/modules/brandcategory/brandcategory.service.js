angular.module('shapp').factory('BrandCategorySrv', BrandCategorySrv);

function BrandCategorySrv($http, urlService) {
  
  function getBrandByCategory(uuid,idCategory){
    return $http({
        method: 'POST',
        data: uuid,
        url : urlService + 'marca/marcasByCategoria/'+idCategory,
        headers: {
          'Content-Type': 'application/json'
    }})
  }

  return{
  	getBrandByCategory:getBrandByCategory
  }
};