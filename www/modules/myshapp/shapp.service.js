angular.module('shapp').factory('MyShapp', MyShapp);

function MyShapp($http, urlService) {
	
  function getMyShapp(uuid){
      return $http({
        method: 'POST',
        data: uuid,
        url: urlService + 'proveedor/listShapps/'+ uuid.uuid.id,
        headers: {
          'Content-Type': 'application/json'
        }})
    }

  return{
  	getMyShapp:getMyShapp
  }
};