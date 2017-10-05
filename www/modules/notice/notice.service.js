angular.module('shapp').factory('Notice', Notice);

function Notice($http, urlService) {

  function getNotice(uuid,idProv){
    return $http({
      url : urlService + 'novedades/movil/listNoticias/'+idProv,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function getNoticeDate(uuid){
    return $http({
      url : urlService + 'novedades/movil/listNewsByDate',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function getPromDate(uuid){
    return $http({
      url : urlService + 'promociones/allPromotions/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
  	getNotice:getNotice,
    getNoticeDate:getNoticeDate,
    getPromDate:getPromDate

  }
};