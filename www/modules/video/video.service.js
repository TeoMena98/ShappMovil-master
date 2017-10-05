angular.module('shapp').factory('Videos', Videos);

function Videos($http, urlService) {

  function getVideos(uuid,idProv){
    return $http({
      url : urlService + 'videos/list/'+idProv,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
  	getVideos:getVideos
  }
};