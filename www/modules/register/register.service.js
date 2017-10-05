angular.module('shapp').factory('RegisterSrv', RegisterSrv);

function RegisterSrv($http, urlService) {

  function registerEmail(data){
    return $http.post(urlService + 'usuarios/register', data);
  }

  return{
    registerEmail:registerEmail
  }
};
