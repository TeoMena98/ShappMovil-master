angular.module('shapp').factory('loginService', loginService);

function loginService($http, urlService){

  function login(form){
      return $http.post(urlService + 'usuarios/login', form);
  }

  function loginFb(form){
    return $http.post(urlService + 'usuarios/registerFB/', form);
  }
  function sendEmail(form){
    return $http.post(urlService + 'recovery/sendEmailMovil/', form);
  }
  function sendPass(form){
    return $http.post(urlService + 'recovery/SendPassRecoveryMovil/', form);
  }
  function token(uuid){
    uuid.token = localStorage.token
    return $http({
      url : urlService + 'notificaciones/updateToken2/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function token2(uuid){
    uuid.message = 'Ups, si llegó?'
    return $http({
      url : urlService + 'notificaciones/broadcastNotification2/',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
    login:login,
    loginFb: loginFb,
    sendEmail:sendEmail,
    sendPass:sendPass,
    token:token,
    token2:token2
  }
}
